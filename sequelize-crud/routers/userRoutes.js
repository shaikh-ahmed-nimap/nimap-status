const {Router} = require('express');

const {getAllUsers, createUser, getSingleUser, updateUser, changePassword} = require('../controllers/user')

const router = Router();

router.route('/').get(getAllUsers).post(createUser);
router.route('/:user_id').get(getSingleUser).patch(updateUser);
router.route('/change-password/:user_id').patch(changePassword);

module.exports = router;