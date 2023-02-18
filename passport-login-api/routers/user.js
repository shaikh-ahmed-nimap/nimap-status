const {Router} = require('express');
const passport = require('passport');
const User = require('../models/User');
const checkAuth = require('../middlewares/isAuthenticated');
const upload = require('../config/multerConf');

const router = Router();

router.post('/login', passport.authenticate('local'), async(req, res) => {
    res.send('success yey')
})

router.post('/logout', async (req, res, next) => {
    req.logout((err) => {
        if (err) {
            res.send(JSON.stringify(err));
        } else {
            res.send('success')
        }
    })
})

router.post('/register', async (req, res) => {
    const body = req.body;
    try {
        const user = User.build(body);
        await user.save()
        res.status(201).json({message: "user created"})
    } catch (e) {
        let errorObj = {}
        if (e.name === 'SequelizeValidationError') {
            e.errors.forEach((err) => {
                if (err.type === 'notNull Violation') {
                    errorObj[err.path] = 'Field is required'
                } else {
                    errorObj[err.path] = err.message
                }
            })
            res.status(400).json(errorObj);
            return;
        }
        if (e.name === "SequelizeUniqueConstraintError") {
            e.errors.forEach((err) => {
                let message = `${err.path} already in use`
                errorObj[err.path] = message
            })
            return res.status(400).json(errorObj)
        }
        res.status(500).json({
            message: "something went wrong"
        })
    }
})

router.get('/current', checkAuth, async (req, res) => {
    try {
        const user = await User.findOne({attributes: ['id', 'name', 'email'], where: {id: req.user.id}})
        res.status(200).json(user)
    }
    catch(e) {
        console.log(e);
        return res.send('somethign went wrong')
    }
});

router.patch('/upload', checkAuth, upload.single('profile_pic'), async (req, res) => {
    const user = req.user;
    console.log(user)
    try {
        const user = await User.findOne({where: {email: req.user.email}});
        if (!user) {
            res.send('no user found');
            return;
        }
        user.img = req.file.filename;
        await user.save();
        res.send('success')
    } catch (e) {
        console.log(e);
        res.status('something went wrong');
    }
});

module.exports = router;