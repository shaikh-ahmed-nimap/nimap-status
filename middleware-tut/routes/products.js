const {Router} = require('express');

const router = Router();

router.route('/').get(async (req, res) => {
    console.log('products route')
    res.send('products route')
})

module.exports = router;