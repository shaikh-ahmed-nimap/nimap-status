require('dotenv').config()
const express = require(
    'express'
);
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {asyncWrapper, authenticateUser, errorHandler} = require('./middlewares');
const { validateUser, validateCredentials } = require('./utils');
const userModel = require('./UserModel')

app.use(express.json());

app.get('/', (req, res) => {
    res.send("<h1>HELLO WORLD</h1>")
});

app.post('/api/user/register', asyncWrapper(async (req, res) => {
    const user = req.body;
    const errors = validateUser(user, userModel)
    if (Object.keys(errors).length) {
        res.status(400).json(errors)
        return;
    }
    const saltRound = 10
    const salt = await bcrypt.genSalt(saltRound);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    userModel.push(user);
    res.status(201).json(req.body)
    return
}))

app.post('/api/user/login', asyncWrapper(async (req, res) => {
    const userToLogin = req.body;
    const errors = validateCredentials(userToLogin.email, userToLogin.password);
    if (Object.keys(errors).length) {
        res.status(400).json(errors)
        return;
    }
    const user = userModel.find((user) => user.email === userToLogin.email);
    if (!user) {
        res.status(400).json({"message": "invalid email"})
        return;
    }
    const match = await bcrypt.compare(userToLogin.password, user.password);
    if (!match) {
        res.status(400).json({"message": "invalid password"});
        return;
    }
    const accessToken = jwt.sign({email: user.email, username: user.username}, process.env.JWT_SECRET_KEY, {expiresIn: '1d'})
    res.header('x-auth-token', accessToken).status(200).json({accessToken})
}))

app.use(authenticateUser)
app.get('/api/user/dashboar', (req, res) => {
    res.send(`Hello ${req.user.username}`)
})
app.use(errorHandler)

const PORT = 5000;

app.listen(
    5000,
    () => console.log(`server listening on port ${PORT}`)
);