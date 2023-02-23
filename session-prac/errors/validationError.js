const CustomError = require('./customError');

class ValidationError extends CustomError {
    constructor(message, errors) {
        super(message, 'ValidationError', 400);
        this.errors = errors
    }
};

module.exports = ValidationError;