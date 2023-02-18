require('dotenv').config();
const path = require('node:path');
const express = require('express');
const app = express();
const userRouter = require('./routers/user');
const {authDB} = require('./config');
const passport = require('passport');
const initializePassport = require('./config/passport-config');
const session = require('express-session')
authDB();
initializePassport(passport);
// app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false
}))

app.use(express.urlencoded({extended: false}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('public'))
app.use('/v1/api', userRouter);

const PORT = 5000;

app.listen(PORT, () => {console.log(`server listening on port ${PORT}`)});