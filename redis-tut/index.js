const express = require('express');
const app = express();
const {Product, Cart} = require('./models');
const client = require("./redis-config");

app.use(express.json());

app.get('/products', async (req, res) => {
    try {
        const productsCount = await Product.count();
        const cachedData = await client.get('products');
        const cachedDataCount = await client.get('products:count');
        if (cachedData && Number(cachedDataCount) === productsCount) {
            return res.status(200).json({source: 'cached', data: JSON.parse(cachedData), result: Number(cachedDataCount)})
        };
        const products = await Product.findAll({attributes: {exclude: ['createdAt', 'updatedAt', 'deletedAt']}, include: Cart});
        await client.SETEX('products', 3600, JSON.stringify(products));
        await client.SETEX('products:count', 3600, JSON.stringify(productsCount));
        res.status(200).json({source: 'api', data: products, result: productsCount});
        return;
    } catch (err) {
        console.log(err);
        res.send('got error');
        return;
    }
});

app.get('/cart', async (req, res) => {
    try {
        const carts = await Cart.findAll({attributes: {exclude: ['createdAt', 'updatedAt', 'deletedAt']}, include: {
            model: Product,
            attributes: {include: ['productId', 'productDesc']}
        }})
        return res.status(200).json({data: carts})
    }
    catch (err) {
        console.log(err);
        return res.send('error in cart get')
    }
})

app.post('/cart/:productId', async (req, res) => {
    try {
        const product = await Product.findOne({where: {productId: req.params.productId}});
        if (!product) {
            return res.status(404).json('product not found')
        }
        const result = await Cart.create();
        await result.addProduct(product);
        return res.status(200).json(result)
    } catch (err) {
        return res.json(JSON.stringify(err))
    }
})

app.post('/products', async (req, res) => {
    try {
        const body = req.body;
        const result = await Product.create(body);
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.send(JSON.stringify(err));
    }   
});

app.listen(5000, () => console.log(5000));