const jwt = require('jsonwebtoken');
const userModel = require('../UserModel');


const authenticateUser = async (req, res, next) => {
    try {
        const token = req.headers['authorization'];
        if (!token || !token.startsWith('Bearer ')) {
            res.status(401).json({'message': 'unAuthorized'})
            return;
        }
        const jwtToken = token.split(' ')[1];
        const result = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
        req.user = result
        next()
    } catch (err) {
        console.log(err)
        res.status(400).json({"message": "invalid token"});
    }
}

module.exports = authenticateUser;