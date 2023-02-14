const {sequelize, DataTypes} = require('./config');

const Customer = sequelize.define('customer', {
    customerName: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    timestamps: false,
})

const Product = sequelize.define('product', {
    product_name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
})

Customer.belongsToMany(Product, {through: 'order'});
Product.belongsTo(Customer, {through: 'order'});

let customer, products;
sequelize.sync({alter: true})
    // .then(() => {
    //     Customer.bulkCreate([
    //         {customerName: 'mike'},
    //         {customerName: 'shane'},
    //         {customerName: 'wandi'},
    //         {customerName: 'shawn'}
    //     ])
    //     Product.bulkCreate([
    //         {
    //             product_name: 'laptop'
    //         },
    //         {
    //             product_name: 'ball'
    //         },
    //         {
    //             product_name: 'kent purifier'
    //         },
    //         {
    //             product_name: 'fan'
    //         },
    //         {
    //             product_name: 'light'
    //         }
    //     ])
    // })
    .then(() => {
        return Customer.destroy({where: {customerName: 'shane'}})
    })
    // .then(data => {
    //     products = data;
    //     return Customer.findOne({where: {customerName: 'shawn'}});
    // })
    // .then((data) => {
    //     customer = data;
    //     return customer.addProduct(products);
    // })
    .catch(err => {
        console.log('connection failed: ', err)
    });