const asyncWrapper = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch (err) {
            console.log(err);
            const error = new Error('Something went wrong')
            error.status = 500;
            return next(error);
        }
    }
}

module.exports = asyncWrapper;