const express = require('express');
const productsRouter = require('./routes/products')

const app = express();
app.use(express.json())
app.get('/', async (req, res) => {
    res.send('<h1>Hello world!!</h1>')
})

app.use('/api/products', productsRouter)

const port = 5000;

module.exports = {app, port}