function createValidationError(errors=[]) {
    const errObj = errors.map(error => ({[error.param]: error.msg}))
    return errObj;
}

module.exports = {createValidationError};