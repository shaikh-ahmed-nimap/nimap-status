const http = require('node:http');

const app = http.createServer((req, res) => {
    if (req.url === '/' && req.method.toLowerCase() === 'get') {
        res.end('hello world!!')
    }
})

module.exports = app;