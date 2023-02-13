const User = require('../models/User');
const bcrypt = require('bcrypt');


const getAllUsers = async (req, res) => {
    try {
        const user = await User.findAll({attributes: {exclude: ['password']}});
        res.status(200).json(user)
    } catch (err) {
        console.log(err);
        res.status(500).json({'message': 'something went wrong please try again later'});
    }
};

const createUser = async (req, res) => {
    try {
        let user = User.build(req.body);
        try {
            user = await user.save()
            user = {user_id: user.user_id,username: user.username}
            res.status(201).json(user)
            return;
        } catch (err) {
            if(err.name === 'SequelizeValidationError' || err.name === "SequelizeUniqueConstraintError") {
                const errObj = {}
                err.errors.forEach((err) => {
                    errObj[err.path] = err.message
                })
                res.status(400).json(errObj)
                return;
            } else {
                res.send(JSON.stringify(err))
            }
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({'message': 'something went wrong please try again later'});
    }
}

const getSingleUser = async (req, res) => {
    const {user_id} = req.params;
    try {
        const user = await User.findByPk(user_id, {attributes: {exclude: ['password']}});
        if (!user) {
            res.status(404).json({'message': 'User not found'});
            return;
        }
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({'message': 'something went wrong'});
    }
};

const updateUser = async (req, res) => {
    const {user_id} = req.params;
    try {
        let user = await User.findByPk(user_id, {attributes: {exclude: ['password']}});
        if (!user) {
            res.status(404).json({'message': 'user not found'});
            return;
        }
        user.username = req.body.username;
        try {
            await user.save();
            res.status(200).json(user);
            return;
        } catch (err) {
            console.log(err);
            const errObj = {}
            if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
                err.errors.forEach(err => {
                    errObj[err.path] = err.message
                });
                return res.status(400).json(errObj);
            }
            return res.status(500).json('went wrong something')
        }
        
    } catch (err) {
        console.log(err);
        res.status(500).json({'message': 'something went wrong'});
    }
}

const changePassword = async (req, res) => {
    const {user_id} = req.params;
    const {currPassword, newPassword} = req.body;
    try {
        if (!currPassword) {
            res.status(400).json({'currentPassword': 'password field is required'});
            return
        }
        const user = await User.findByPk(user_id);
        if (!user) {
            return res.status(400).json({'message': 'User not found'})
        }
        const isMatch = await bcrypt.compare(currPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({'currPassword': 'invalid password'});
        }
        user.password = newPassword;
        await user.save();
        return res.status(200).json({'message': 'password change successfully'});
    } catch (err) {
        res.status(500).json({'message': 'something went wrong'});
        return;
    }
}

module.exports = {getAllUsers, createUser, getSingleUser, updateUser, changePassword};