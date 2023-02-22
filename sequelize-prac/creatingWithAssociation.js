const sequelize = require('./db');
const {Sequelize, Model, DataTypes} = require('sequelize');

const PUser = sequelize.define('puser', {
    firstName: {
        type: DataTypes.STRING
    }
}, {timestamps: false})

// class PUser extends Model {};

// PUser.init({
    
// }, {sequelize, modelName: 'user'});


const Product = sequelize.define('product', {
    title: {type: DataTypes.STRING}
}, {timestamps: false})
// class Product extends Model {};

// Product.init({
    
// }, {sequelize, modelName: 'product'});

const Address = sequelize.define('addresses', {
    type: DataTypes.STRING,
  line1: Sequelize.STRING,
  line2: Sequelize.STRING,
  city: Sequelize.STRING,
  state: Sequelize.STRING,
  zip: Sequelize.STRING,
}, {timestamps: true});

// class Address extends Model {}
// Address.init({
  
// }, { sequelize, modelName: 'addresses' });

class PTag extends Model {

};

PTag.init({
    name: Sequelize.STRING
}, {sequelize, modelName: 'ptag'});

PUser.Addresses = PUser.hasMany(Address);
Product.PUser = Product.belongsTo(PUser);
const TAG = Product.hasMany(PTag);

sequelize.sync().then(() => {
    return Product.create({title: 'chair',
        ptag: [
            {name: 'tag1'},
            {name: 'tag2'},
            {name: 'tag3'}
        ]
    }, {include: [{
        association: TAG
    }]})
})
.then((product) => {
    console.log(product.toJSON())
})
.catch(err=> console.log(err))