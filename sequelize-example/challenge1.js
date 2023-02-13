const {sequelize, DataTypes, Model} = require('./config');
const {Op} = require('sequelize');

const Student = sequelize.define('student', {
    student_id: {
        type: DataTypes.TINYINT,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [4, 20]
        }
    },
    favorite_class: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: 'CS'
    },
    school_year: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    subscribed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
})

Student.sync()
    // .then(() => {
    //     return Student.bulkCreate([
    //         {name: 'studentOne', school_year: 2014},
    //         {name: 'studentTwo', favorite_class: 'Biology', school_year: 2016, subscribed: true},
    //         {name: 'studentThree', favorite_class: 'Math', school_year: 2014, subscribed: true},
    //         {name: 'studentFour', school_year: 2017},
    //         {name: 'studentFive', favorite_class: 'Math', school_year: 2016, subscribed: true},
    //         {name: 'studentTwo', favorite_class: 'Biology', school_year: 2014},
    //     ], {validate: true, returning: true})
    // })
    // .then(() => {
    //     return Student.findAll({attributes: ['name', 'favorite_class', 'subscribed'], where: {
    //         [Op.and]: {favorite_class: 'Math', subscribed: true}
    //     }})
    // })
    .then(() => {
        return Student.findAll({attributes: ['school_year', [sequelize.fn('COUNT', sequelize.col('name')), 'num_students']], group: ['school_year']})
    })
    .then((data) => {
        data.forEach(ele => console.log(ele.toJSON()));
    })
    .catch((err) => {
        console.log('error: ', err)
    })