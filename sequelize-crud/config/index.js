const {Sequelize} = require('sequelize');


const sequelize = new Sequelize(process.env.MYSQL_DB, process.env.MYSQL_USER, process.env.MYSQL_PASS, {
    host: process.env.MYSQL_HOST || 'localhost',
    dialect: 'mysql'
});

async function mySqlConnect () {
    try {
        await sequelize.authenticate();
        console.log('connection established');
    } catch (err) {
        console.log('connection failed with error: ', err)
    }
};

module.exports = {sequelize, mySqlConnect};
