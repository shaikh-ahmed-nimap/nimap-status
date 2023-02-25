'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt');
const crypto = require('node:crypto');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    async hashPassword (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      return hashedPassword;
    }

    async createResetToken () {
      const resetToken = crypto.randomBytes(10).toString('hex');
      this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
      this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
      console.log({passwordResetExpires: this.passwordResetExpires}, {passwordResetToken: this.passwordResetToken}, {resetToken})
      return resetToken;
    }

    static associate(models) {
      // define association here
    }
  }
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM,
      values: ['user', 'admin'],
      defaultValue: 'user'
    },
    passwordResetToken: {
      type: DataTypes.STRING
    },
    passwordResetExpires: {
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'User',
    paranoid: true
  });
  return User;
};