const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

function initializePassport (passport, getUserByEmail, getUserById) {
    const authenticateUser = async (email, password, done) => {
        let user = getUserByEmail(email);
        if (!user) {
            return done(null, false, {message: "No user found"});
        }
        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, {message: 'incorrect password'})
            }
        } catch (err) {
            return done(err)
        }
    }
    passport.use(new LocalStrategy({usernameField: 'email'}, authenticateUser));
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => done(null, getUserById(id)))
}

module.exports = initializePassport;