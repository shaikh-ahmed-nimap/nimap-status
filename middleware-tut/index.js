const express = require('express');
const throwError = require('./middlewaresTask/throwError');
const app = express();

app.use(throwError);

app.get('/', (req, res) => {
    res.send('body recieved in request object' + JSON.stringify(req.body))
})

app.get('/throw', (req, res) => {
    res.send('error thrown')
})



  
app.listen(2000);
