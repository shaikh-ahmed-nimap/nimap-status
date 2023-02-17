const {sequelize, DataTypes} = require('../config');
const bcrypt = require('bcrypt');

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: {
                msg: 'Invalid email'
            },
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

User.prototype.hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    return hashedPass;
}

User.prototype.verifyPassword = async (password, encPass) => {
    const isMatch = await bcrypt.compare(password, encPass)
    return isMatch;
}



User.sync().then(() => {
    console.log('Table synced')
}).catch(e => {
    console.log(e);
    throw e;
})

module.exports = User;