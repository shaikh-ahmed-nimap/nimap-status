const zlib = require('node:zlib');
const {sequelize, DataTypes} = require('./config');
const {Op, ValidationError} = require('sequelize');
const bcrypt = require('bcrypt');


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
            len: [3, 4],
            notNull: {
                msg: 'Username is required'
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
            const salt = bcrypt.genSaltSync(12);
            const hash = bcrypt.hashSync(value, salt);
            this.setDataValue('password', hash);
        }
    },
    age: {
        type: DataTypes.TINYINT,
        validate: {
            isUnderAge (value) {
                if (value < 18)  {
                    throw new Error('Not old enough')
                }
            }
        }
    },
    description: {
        type: DataTypes.STRING,
        set (value) {
            const compressed = zlib.deflateSync(value).toString('base64');
            this.setDataValue('description', compressed)
        },
        get() {
            const value = this.getDataValue('description');
            return zlib.inflateSync(Buffer.from(value, 'base64')).toString()
        }
    },
    aboutUser: {
        type: DataTypes.VIRTUAL,
        get() {
            return `${this.username} ${this.description}`
        }
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true,
        validate: {
            isEmail: true,
            nullEmailValidator (value) {
                if (value === null) {
                    throw new Error('Email is required')
                }
            }
        }
    }
})

User.sync({alter: true})
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
    // .then(()=> {
    //     return User.findAll({attributes: [[sequelize.fn('COUNT', sequelize.col('user_id'))], 'username', 'age', 'password'], group: ['username', 'age', 'password']})
    // })
    // .then(() => {
    //     return User.findAll({attributes: ['username', 'age'], where: {age: {[Op.gt]: 25}}, order: ['age']})
    // })
    // .then(() => {
    //     return User.findAll({attributes: ['username', 'password', 'age'], where: 
    //         sequelize.where(sequelize.fn('char_length', sequelize.col('username')), {[Op.gt]: 4})
    //     })
    // })
    // .then(() => {
    //     return User.update({username: 'jjj'}, {where: {age: 25}})
    // })
    // .then(() => {
    //     return User.findAll({attributes: ['username', 'password'], where: {age: {[Op.gt]: 25}}, raw: true})
    // })
    // .then(() => {
    //     return User.findByPk(1);
    // })
    // .then(() => {
    //     return User.findOne({where: {user_id: 1}});
    // })
    // .then(() => {
    //     return User.findOne({where: {user_id: 1}});
    // })
    // .then(() => {
    //     return User.findOrCreate({where: {username: 'jjj'}, raw: true})
    // })
    // .then(() => {
    //     return User.findAndCountAll({raw: true})
    // })
    .then(() => {
        return User.create({
            username: 'map',
            password: "somethingstrong",
            description: 'This is some awesome description written by kepa',
            age: 22,
        }).validate();;
    })
    .then((data) => {
        // const {count, rows} = data;
        // console.log(count);
        // console.log('data\n', rows)
        // console.log(data.username);
        // console.log(data.password);
        // console.log(data.description);
        console.log(data.aboutUser)
    })
    // .then((data) => {
    //     data.forEach((ele) => console.log(ele.toJSON()))
    // })
    .catch((err) => console.log('syncing failed with error ', err));

