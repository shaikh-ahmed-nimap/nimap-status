const sequelize = require('./db');
const {Sequelize, Model, DataTypes} = require('sequelize');

class PUser extends Model {};

PUser.init({
    firstName: {
        type: DataTypes.STRING
    }
}, {sequelize, modelName: 'user'});

class Product extends Model {};

Product.init({
    title: {type: DataTypes.STRING}
}, {sequelize, modelName: 'user'});

class Address extends Model {}
Address.init({
  type: DataTypes.STRING,
  line1: Sequelize.STRING,
  line2: Sequelize.STRING,
  city: Sequelize.STRING,
  state: Sequelize.STRING,
  zip: Sequelize.STRING,
}, { sequelize, modelName: 'address' });

Product.PUser = Product.belongsTo(PUser);
PUser.Addresses = PUser.hasMany(Address);

sequelize.sync().then(() => {
    console.log(Product.PUser)
}).catch(err=> console.log(err))