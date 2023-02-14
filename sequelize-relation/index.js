require('dotenv').config();
const {sequelize, DataTypes} = require('./config')

const Customer = sequelize.define('customer', {
    customer_id: {
        type: DataTypes.TINYINT,
        primaryKey: true,
        autoIncrement: true
    },
    customer_name: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
}, {
    timestamps: false
});

const Product = sequelize.define('product', {
    product_id: {
        type: DataTypes.TINYINT,
        primaryKey: true,
        autoIncrement: true
    },
    product_name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
});

const Cart = sequelize.define('cart', {
    cart_id: {
        type: DataTypes.TINYINT,
        primaryKey: true,
        autoIncrement: true
    }
}, {
    timestamps: false
});

const CartProducts = sequelize.define('cart_product', {
    
})

Customer.hasOne(Cart, {foreignKey: 'customer_id', onDelete: 'CASCADE'});
Cart.belongsTo(Customer, {foreignKey: 'customer_id', onDelete: 'CASCADE'});

Cart.belongsToMany(Product, {foreignKey: 'product_id', through: CartProducts});
Product.belongsToMany(Cart, {through: CartProducts, foreignKey: 'cart_id'});

let customer, cart, products;
sequelize.sync({alter: true})
    // .then(() => {
    // //     Customer.bulkCreate([
    // //         {customer_name: 'jhon'},
    // //         {customer_name: 'jane'},
    // //         {customer_name: 'shane'},
    // //         {customer_name: 'shawn'},
    // //         {customer_name: 'minty'},
    // //         {customer_name: 'lena'},
    // //         {customer_name: 'miky'},
    // //         {customer_name: 'joshua'},
    // //     ]);
    // //     Product.bulkCreate([
    // //         {product_name: 'product1'},
    // //         {product_name: 'product2'},
    // //         {product_name: 'product3'},
    // //         {product_name: 'product4'},
    // //         {product_name: 'product5'},
    // //         {product_name: 'product6'},
    // //         {product_name: 'product7'},
    // //         {product_name: 'product8'},
    // //         {product_name: 'product9'},
    // //         {product_name: 'product'},
    // //     ])
    // // })
    //     return Customer.findOne();
    // })
    .then(() => {
        return Cart.findOne();
    })
    // .then((data) => {
    //     cart = data;
    //     return Product.findOne({where: {product_name: 'product3'}});
    // })
    // .then(data => {
    //     products = data;
    //     return cart.addProduct(products);
    // })
    .then(() => {
        return Customer.findOne({where: {customer_id: 1}, raw: true})
    })
    .then(data => {
        return Cart.findOne({where: {customer_id: data.customer_id}, include: Product, raw: true})
    })
    .then(data => {
        // cart = data;
        // return cart_product
        console.log(data)
    })
    .catch((err) => {
        console.log('syncing failed with error: ', err)
    })