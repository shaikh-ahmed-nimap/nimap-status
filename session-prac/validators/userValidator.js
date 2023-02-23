const {body, validationResult} = require('express-validator');
const {createValidationError} = require('../utils');
const {ValidationError} = require('../errors')

const validationRegisterRule = () => {
    return [
        body('firstName', 'field is required').exists(),
        body('lastName', 'field is required').exists(),
        body('email').exists().withMessage('field is required').isEmail().withMessage('Please use valid email'),
        body('password').exists().withMessage('field is required').isLength({min: 6}).withMessage('password must be 6 character long'),
        
    ]
};

const validate = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errObj = createValidationError(errors.array({onlyFirstError: true}));
        const err = new ValidationError('validation error', errObj);
        return next(err)
    }
    return next();
};

module.exports = {
    validationRegisterRule,
    validate
}