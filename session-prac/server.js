require('dotenv').config({path: '.env'});
const app = require('./app');
const PORT = process.env.PORT || 5000;

(function (port) {
    try {
        app.listen(port, () => {console.log(`server started at ${port}`)})
    } catch (err) {
        console.log(err);
        throw err;
    }
})(PORT)