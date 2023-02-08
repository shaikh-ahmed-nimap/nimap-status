const express = require('express');
const app = express();
const sessions = require('express-session');
const cookieParser = require('cookie-parser');

app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: 30000 },
    resave: false 
}));

app.use(express.json());

app.post('/api/login', (req, res) => {
    const {username, password} = req.body;
    try {
        if (username !== 'user' || password !== '1234') {
            res.status(400).json({msg: "invalid username or password"});
            return;
        }
        req.session.user = {username};
        return res.status(200).json({msg: 'logged in successfully'});
    } catch (err) {
        console.log(err);
        return res.status(500).json({msg: 'something went wrong'});
    }
})
app.use(auth)
app.get('/api/dash', (req, res) => {
    res.status(200).json(req.user)
});

const PORT = 5000;

app.listen(PORT, () => console.log(PORT))

async function auth(req, res, next) {
    if (req.session && req.session.user) {
        req.user = req.session.user;
        next();
        return;
    } else {
        res.status(401).json({msg:'unAuthorized'})
        return;
    }
} 