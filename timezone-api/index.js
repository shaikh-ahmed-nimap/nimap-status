
const express = require('express');
const moment = require('moment-timezone');
require('dotenv').config();

const app = express();

const zones = {
    mumbai: moment().tz('India/Mumbai').format(),
    kolkata: moment().tz('India/Kolkata').format(),
    delhi: moment().tz('India/Delhi').format(),
    utterpardesh: moment().tz('India/UP').format()
}

console.log(process.env.NODE_ENV)
console.log(app.get('env'))

app.get('/api/zones', async (req, res) => {
    const city = req.query.city
    try {
        if (city && city !== '') {
            if (!zones[city]) {
                res.status(404).json({'message': `Time zone for ${city} not found.`})
                return;
            }
            res.status(200).json({[city]: zones[city]})
            return;
        }
        res.status(200).json(zones)
        return;
    } catch (err) {
        if (app.get('env') === 'develpment') {
            console.log(err)
        }
        res.status(500).json({'message': 'something went wrong please try again later'});
    }
})

const PORT = 5000;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))



