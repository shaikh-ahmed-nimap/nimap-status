const CustomError = require("./customError");

class ForbiddenError extends CustomError {
    constructor(message) {
        super(message, 'ForbiddenError', 403);
    }
};

module.exports = ForbiddenError;