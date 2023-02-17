const {DataTypes} = require('sequelize');
const sequelize = require('./connection');

const authDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection stablished')
    } catch (e) {
        throw e;
    }
}

module.exports = {sequelize, DataTypes, authDB};