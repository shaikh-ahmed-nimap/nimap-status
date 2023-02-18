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
        set(value) {
            const salt = bcrypt.genSaltSync(10);
            const hashedPass = bcrypt.hashSync(value, salt);
            this.setDataValue('password', hashedPass) 
        }
    },
    img: {
        type: DataTypes.STRING,
    }
});

// User.prototype.hashPassword = async (password) => {
//     if (!password) {
//         const error = new Error();
//         error.message = {password: 'Field is required'};
//         error.name = 'PasswordRequiredError';
//         return {error}
//     }
//     const salt = await bcrypt.genSalt(10);
//     const hashedPass = await bcrypt.hash(password, salt);
//     return {error: null, hashedPass};
// }

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