const CustomError = require("./customError");

class UnAuthorized extends CustomError {
    constructor(message) {
        super(message, 'UnAuthorizedError', 401);
    }
};

module.exports = UnAuthorized;