const config = require('config');
const express = require('express');
const Joi = require('joi')

const app = express();
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.post('/', (req, res) => {
    const Schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required()
    })
    const {error, value} = Schema.validate(req.body)
    if (error) {
        let message = error.details[0].message.replace(/(\s+ | " | \/)/g , '')
        res.send(`${message}`)
    } else {
        res.send(JSON.stringify(value))
    }
})

app.listen(2000)