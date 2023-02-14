const {Sequelize, DataTypes} = require('sequelize');


const sequelize = new Sequelize('sequelize_relation', process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql'
});

(async function () {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
})

module.exports = {sequelize, DataTypes};