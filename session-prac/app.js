const express = require('express');
const {asyncWrapper, errorHandler} = require('./middlewares');
const {userRouter} = require('./routes');
const session = require('express-session');
const app = express();

// Body parser middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false
}))

// routes
app.get('/', asyncWrapper(async (req, res, next) => {
        return res.send('hello world');
}));
app.use('/api/users', userRouter);
app.use(errorHandler);
app.all('*', (req, res) => {
    return res.status(404).json({status: "fail", message: `Can't find ${req.originalUrl}`})
})

module.exports = app;