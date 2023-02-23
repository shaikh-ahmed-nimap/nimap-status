const {Router} = require('express');
const {asyncWrapper} = require('../middlewares');
const {register, login} = require('../controllers/user');
const {userValidators} = require('../validators')

const router = Router();

router.route('/register').get(asyncWrapper(async (req, res, next) => {
    return res.send('Register route')
})).post(userValidators.validationRegisterRule(), userValidators.validate, register);

router.route('/login').get(asyncWrapper(async (req, res, next) => {
    return res.send('Login route')
})).post(login)

module.exports = router;