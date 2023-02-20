require('dotenv').config();
const {Sequelize} = require('sequelize');

console.log(process.env.USER)
console.log(process.env.DATABASE)
const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
    dialect: 'mysql'
});

sequelize.authenticate().then(() => {
    console.log('Success')
}).catch(err => console.log(err));

module.exports = sequelize;