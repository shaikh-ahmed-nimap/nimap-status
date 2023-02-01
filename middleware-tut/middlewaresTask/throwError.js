const throwError = async (req, res, next) => {
    if (req.url === '/throw') {
        throw new Error('This url is block')
    } else {
        req.body = {username: 'username'}
    }
    next();
}

module.exports = throwError;