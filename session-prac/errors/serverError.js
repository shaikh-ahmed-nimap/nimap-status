const CustomError = require('./customError');

class ServerError extends CustomError {
    constructor(message) {
        super(message, 'InternalServerError', 500);
    }
}

module.exports = ServerError;