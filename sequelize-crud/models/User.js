const {DataTypes} = require('sequelize');
const bcrypt = require('bcrypt');
const {sequelize} = require('../config');


const User = sequelize.define('user', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: {
                args: [5, 20],
                msg: 'username must be 5 to 20 characters long'
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [6, 100],
                msg: 'Password must be 6 to 50 character long'
            }
        },
        set(value) {
            console.log(value)
            const saltRound = 12;
            const salt = bcrypt.genSaltSync(saltRound);
            const hashedPassword = bcrypt.hashSync(value, salt);
            console.log(hashedPassword)
            this.setDataValue('password', hashedPassword);
        }
    }
}, {
    timestamps: false,
});

async function createUserTable () {
    try {
        await User.sync({alter: true});
        console.log('Created User Field');
    } catch (err) {
        console.log('table creationg failed with error: ', err)
    }
}

createUserTable();

module.exports = User;
