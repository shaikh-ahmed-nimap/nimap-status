const express = require('express');

const app = express();

const bcypt = require('bcrypt');
const session = require('express-session');
const flash = require('express-flash');
const initializePassport = require('./passport-config');
const passport = require('passport');

let users = []

initializePassport(
    passport,
    email => {
        return users.find(user => user.email === email);
    },
    id => {
        return users.find(user => user.id === id)
    }
);

app.set('view-engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(flash());
app.use(session({
    secret: 'some-secret-key',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());



app.get('/', checkAuth, (req, res) => {
    res.render('index.ejs', {name: req.user.name})
})

app.get('/register', checkNoAuth, (req, res) => {
    res.render('register.ejs');
})

app.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcypt.hash(req.body.password, 10);
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        res.redirect('/login');
    } catch (err) {
        res.redirect('/register');
    }
    console.log(users)
})  

app.get('/login', checkNoAuth ,(req, res) => {
    res.render('login.ejs');
})

app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))


function checkAuth (req, res, next) {
    if (req.isAuthenticated()) {
        next();
        return;
    }
    res.redirect('/login');
}
function checkNoAuth (req, res, next) {
    if (req.isAuthenticated()) {
        res.redirect('/')
        return;
    }
    next()
}

app.listen(5000, () => console.log(5000));