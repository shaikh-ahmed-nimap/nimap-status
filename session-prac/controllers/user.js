const crypto = require('node:crypto');
const {asyncWrapper} = require('../middlewares');
const {User} = require('../models');
const {ValidationError, ServerError} = require('../errors');
const bcrypt = require('bcrypt');
const {sendMail} = require('../utils');
const { Op } = require('sequelize');

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
});

module.exports.current = asyncWrapper(async (req, res, next) => {
    return res.status(200).json({status: 'success', data: req.user})
});

module.exports.changePassword = asyncWrapper(async (req, res, next) => {
    const {currPassword, newPassword} = req.body;
    let err;
    const errors = [];
    if (!currPassword) {
        errors.push({currPassword: 'field is required'});
    }
    if (!newPassword) {
        errors.push({newPassword: 'field is required'});
    }
    if (errors.length) {
        err = new ValidationError('validation error', errors);
        return next(err)
    };
    const user = await User.findOne({where: {id: req.user.id}});
    const isMatched = await bcrypt.compare(currPassword, user.password);
    if (!isMatched) {
        err = new ValidationError('validation error', [{currPassword: 'Password not matched to current password'}]);
        return next(err);
    };
    const hashedPassword = await user.hashPassword(newPassword);
    user.password = hashedPassword;
    await user.save();
    return res.status(200).json({status: 'success', message: 'password change successfully'});
});

module.exports.forgotPassword = asyncWrapper(async (req, res, next) => {
    if (!req.body.email) {
        const err = new ValidationError('validation error', [{email: 'field is required'}]);
        return next(err);
    }
    const user = await User.findOne({where: {email: req.body.email}});
    if (!user) {
        const err = new ValidationError('validation error', [{email: 'invalid email'}]);
        return next(err);
    }
    const resetToken = await user.createResetToken();
    await user.save();
    const resetUrl = `${req.protocol}://${req.get('host')}/api/users/reset-password/${resetToken}`
    const mailSend = await sendMail({
        email: user.email,
        subject: "token to reset password (valid for 10 minutes)",
        message: resetUrl
    })
    if (!mailSend) {
        user.passwordResetToken = null;
        user.passwordResetExpires = null;
        await user.save();
        const err = new ServerError('Something went wrong please try again after some time')
        return next(err)    
    }
    return res.status(200).json({status:'success', message: 'Check your mail to get url for changing your password'})
})

module.exports.resetPassword = asyncWrapper(async (req, res, next) => {
    if (!req.body.newPassword) {
        const err = new ValidationError('validation error', [{newPassword: 'field is required'}]);
        return next(err)
    }
    const hashToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await User.findOne({where: {[Op.and]: {passwordResetToken: hashToken, passwordResetExpires: {[Op.gt]: new Date()}}}});
    if (!user) {
        const err = new ValidationError('validation error', [{token: 'token is invalid or expired'}])
        return next(err);
    };

    const hashedPassword = await user.hashPassword(req.body.newPassword);
    user.password = hashedPassword;
    user.passwordResetToken = null;
    user.passwordResetExpires = null;
    await user.save();
    return res.status(200).json({status: 'success', message: 'Password reset success'});
})