const {Router} = require('express');
const {getProducts, createProduct, updateProduct, deleteProduct, getProduct} = require('../controllers/products')

const router = Router();

router.get('/', getProducts)
router.post('/', createProduct);
router.get('/:productId', getProduct);
router.put('/:productId', updateProduct);
router.delete('/:productId', deleteProduct)

module.exports = router;