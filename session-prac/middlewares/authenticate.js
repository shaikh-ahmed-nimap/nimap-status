const {User} = require('../models');
const {UnAuthorized} = require('../errors')

const authenticate = async (req, res, next) => {
    console.log(req.session)
    if (!req.session.isAuth) {
        const authErr = new UnAuthorized('UnAuthorized');
        return next(authErr);
    }
    const user = await User.findOne({attributes: {exclude: ['password', 'passwordResetToken', 'passwordResetExpires']}, where: {id: req.session.user_id}});
    if (!user) {
        const authErr = new UnAuthorized('UnAuthorized');
        return next(authErr);
    }
    req.user = user;
    return next()
}

module.exports = authenticate;