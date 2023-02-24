const {CustomError} = require('../errors');

const errorHandler = (err, req, res, next) => {
    console.log(err.name, err.status, err.message)
    if (err.name === 'ValidationError') {
        return res.status(err.status).json({status: 'fail', errors: err.errors})
    }
    if (err.name === 'UnAuthorizedError') {
        return res.status(err.status).json({status: 'fail', data: err.message})
    }
    return res.status(500).json({status: "fail", message: 'something went wrong'});
}

module.exports = errorHandler;