const checkAuth = async (req, res, next) => {
    try {
        console.log(req.session, req.isAuthenticated())
        if (req.isAuthenticated()) {
            next();
            return;
        }
        return res.status(401).json({'message': 'unAuthorize'});
    } catch (e) {
        console.log(e);
        return res.status(500).json({message: 'something went wrong'})
    }
} 

module.exports = checkAuth;