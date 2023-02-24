const {Router} = require('express');
const {asyncWrapper, authenticate} = require('../middlewares');
const {register, login, current, changePassword, forgotPassword, resetPassword} = require('../controllers/user');
const {userValidators} = require('../validators')

const router = Router();

router.route('/register').get(asyncWrapper(async (req, res, next) => {
    return res.send('Register route')
})).post(userValidators.validationRegisterRule(), userValidators.validate, register);

router.route('/login').get(asyncWrapper(async (req, res, next) => {
    return res.send('Login route')
})).post(login);

router.route('/current').get(authenticate, current).post(authenticate, changePassword);

router.route('/forgot-password').post(forgotPassword);

router.route('/reset-password/:token').patch(resetPassword);

module.exports = router;