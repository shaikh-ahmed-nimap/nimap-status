const {ServerError} = require('../errors')

const asyncWrapper = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch (err) {
            console.log(err);
            const error = new ServerError('Something went wrong')
            return next(error);
        }
    }
}

module.exports = asyncWrapper;