const {Router} = require('express');

const router = Router();

router.route('/').get((req, res) => {
    console.log('users route')
    res.send('User Routes')
})

module.exports = router;