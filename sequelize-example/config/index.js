const {Sequelize, DataTypes, Model} = require('sequelize');


const sequelize = new Sequelize('sequelize_tut', 'root', '12345678', {
    host: 'localhost',
    dialect: 'mysql'
})

try {
    sequelize.authenticate();
    console.log('connection stablished')
} catch (err) {
    console.log('connection failed with err: ', err);
}

module.exports = {sequelize, DataTypes, Model};