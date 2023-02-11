const {sequelize, DataTypes} = require('./config');
const {Op} = require('sequelize')

const User = sequelize.define('User', {
    user_id: {
        type: DataTypes.TINYINT,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [3, 4]
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.TINYINT
    }
})

User.sync()
    // .then(() => {
    //     return User.create(
    //     {username: 'janeasdfasd', password: '2222', age: 25},
    //     )
    // })
    // .then((data) => {
    //     data.username = 'john'
    //     data.password = '1234'
    //     return data.save({fields: ['username']})
    // })
//    .then(() => {
//         return User.findAll({attributes: [['username', 'myname'], 'password']})
//     })
    // .then(() => {
    //     // return User.findAll({attributes: [[sequelize.fn('SUM', sequelize.col('age')), 'total_age']]})
    //     // return User.findAll({attributes: [[sequelize.fn('AVG', sequelize.col('age')), 'avg_age']]})
    //     return User.findAll({attributes: {exclude: 'password'}})
    // })
    // .then(() => {
    //     return User.findAll({attributes: ['username', 'password', 'age'], where: {[Op.not]: {[Op.or]: {username: 'john', age: 25}}}, limit: 2})
    // })
    .then(()=> {
        return User.findAll({attributes: [[sequelize.fn('COUNT', sequelize.col('user_id'))], 'username', 'age', 'password'], group: ['username', 'age', 'password']})
    })
    .then((data) => {
        data.forEach((ele) => console.log(ele.toJSON()))
    })
    .catch((err) => console.log('syncing failed with error ', err));

