
const connection = require('../db/connection');

const getProducts = (req, res) => {
        connection.query("CALL get_products()", (err, data) => {
            if (err) {
                console.log(err.code)
                res.status(500).json({"message": "something went wrong"})
                return;
            }
            console.log(data[0])
            res.status(200).json(data[0])
        })
}

const createProduct = (req, res) => {
    const body = req.body;
    connection.query("CALL insert_product(?, ?, ?, ?)", [body.product_name, body.description, body.price, body.in_stock], (err, data) => {
        if (err) {
            if (err.errno === 1048) {
                res.status(400).json({"message": err.sqlMessage})
                return;
            }
            res.send(JSON.stringify(err))
            return;
        }
        console.log(data)
        res.status(201).json(data[0][0])
        return;
    })
}

const getProduct = (req, res) => {
    const {productId} = req.params
    connection.query('CALL get_product_with_id(?)', productId, (err, data) => {
        if (err) {
            console.log(err)
            res.json(JSON.stringify(err))
            return;
        }
        if (data[0].length) {
            res.status(200).json(data[0][0])
            return;
        }
        res.status(404).json({"message": `product with id ${productId} not found!`})
    })
}

const updateProduct = async (req, res) => {
    const {productId} = req.params
   connection.query("CALL update_product(?, ?, ?, ?, ?)", [productId, req.body.product_name, req.body.description, req.body.price, req.body.in_stock], (err, data) => {
    if (err) {
        console.log(err);
        res.send(JSON.stringify(err))
        return;
    }
    console.log(data);
    if (data[0].length) {
        res.status(200).json(data[0][0]);
        return;
    }
    res.status(404).json({"message": `product with product id ${productId} not found!!`})
   })
}


const deleteProduct = async (req, res) => {
    const {productId} = req.params
    connection.query("CALL delete_product(?)", productId, (err, data) => {
        if (err) {
            console.log(err);
            res.send(JSON.stringify(err))
            return;
        }
        console.log(data)
        if (data[0].length) {
            res.status(200).json({"message": "Product deleted successfully"});
            return;
        }
        res.status(404).json({"message": `product with id ${productId} not found!!`})
    } )
}



module.exports = {getProducts, createProduct, getProduct, updateProduct, deleteProduct}