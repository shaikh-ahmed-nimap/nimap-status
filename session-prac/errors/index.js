const CustomError = require('./customError');
const ValidationError = require('./validationError');
const UnAuthorized = require('./unAuthorized');
const ServerError = require('./serverError');
const NotFoundError = require('./notFoundError');
const ForbiddenError = require('./ForbiddenError');

module.exports = {CustomError, ValidationError, UnAuthorized, ServerError, NotFoundError, ForbiddenError};