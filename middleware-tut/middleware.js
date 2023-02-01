const fs = require('fs')
const middleware = async (req, res, next) => 
{
    let body;
    req.on('data', (data) => {
        body += data
    })
    req.on('end', () => {
        fs.writeFile('./writeuser.png', body, (err) => {
            console.log(err)
        })
        req.body = {name: 'random'}
    })
    next()
}

module.exports = middleware