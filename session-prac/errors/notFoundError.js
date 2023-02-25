const CustomError = require("./customError");

class NotFoundError extends CustomError {
    constructor(message) {
        super(message, 'NotFoundError', 404);
    }
};

module.exports = NotFoundError;