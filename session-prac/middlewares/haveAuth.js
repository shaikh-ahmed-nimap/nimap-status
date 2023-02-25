const {ForbiddenError} = require('../errors');

const haveAuth = async (req, res, next) => {
    const {id} = req.user;
    const {userId} = req.params;
    // console.log(req.user.role !== 'admin');
    // console.log(req.)
    // console.log(Number(userId) !== id || 'user' !== 'admin')
    if (Number(userId) !== id && req.user.role !== 'admin') {
        const err = new ForbiddenError('You don\'t have access to perform this task');
        return next(err);
    };
    return next();
};

module.exports = haveAuth;