const express = require('express');

const app = express();

app.get('/user', (req, res) => {
    res.send('<h1>user page</h1>')
});

app.listen(5000, () => console.log(5000));
