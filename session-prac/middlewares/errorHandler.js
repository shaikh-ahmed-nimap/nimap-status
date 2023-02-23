const {CustomError} = require('../errors');

const errorHandler = (err, req, res, next) => {
    if (err.name === 'ValidationError') {
        return res.status(err.status).json({status: 'fail', errors: err.errors})
    }
    return res.status(err.status).json({status: "fail", message: err.message});
}

module.exports = errorHandler;