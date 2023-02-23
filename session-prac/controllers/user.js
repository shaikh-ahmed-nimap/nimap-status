const {asyncWrapper} = require('../middlewares');
const {User} = require('../models');
const {ValidationError} = require('../errors');
const bcrypt = require('bcrypt');

module.exports.register = asyncWrapper(async (req, res, next) => {
    const body = req.body;
    console.log(body);
    try {
        const user = User.build(body);
        const hashedPassword = await user.hashPassword(body.password);
        user.password = hashedPassword;
        await user.save();
        return res.status(201).json({status: 'success', message: 'User created'});
    } catch (err) {
        console.log(err)
        if (err.name === 'SequelizeUniqueConstraintError') {
            const errObj = err.errors.map(error => ({[error.path]: `${error.path} in use`}))
            const errors = new ValidationError('validation error', errObj);
            return next(errors)
        }
        return next(err)
    } 
});

module.exports.login = asyncWrapper(async (req, res, next) => {
    console.log(req.session);
    const body = req.body;
    try {
       const user = await User.findOne({where: {email: body.email || ''}});
       let errors;
       let err;
       if (!user) {
            errors = [{email: "invalid email"}]
            err = new ValidationError('validation error', errors);
            return next(err)
       }
       const passwordMatched = await bcrypt.compare(body.password, user.password);
       if (!passwordMatched) {
        errors = [{password: "invalid password"}]
        err = new ValidationError('validation error', errors);
        return next(err) 
       }
       req.session.user_id = user.id;
       req.session.isAuth = true;
       return res.send('login success')
    }
    catch (err) {
        console.log(err);
        return res.send('something went wrong')
    }
})