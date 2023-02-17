const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');



function initializePassport (passport) {
        passport.use(new LocalStrategy({
            usernameField: 'email',
            session: true
        }, 
        async (email, password, done) => {
            try {
                const user = await User.findOne({where: {email: email}});
                console.log(user)
                if (!user) {
                    return done(null, false, {message: 'invalid email or password'})
                }
                const isMatch = await user.verifyPassword(password, user.password);
                if (!isMatch) {
                    return done(null, false, {message: 'invalid username or password'});
                }
                return done(null, user);
            }
            catch (e) {
                done(e)
            }
        }
    ));

    passport.serializeUser((user, done) => {
        console.log(user);
        done(null, user.id)
    })
    passport.deserializeUser(async (id, done) => {
        try {
            console.log('calling deserialzie')
           const user = await User.findOne({attributes: ['id', 'name', 'email'], where: {id:id}})
           done(null, user.toJSON())
        } catch (e) {
            console.log(e)
            done(e)
        }
    })
    
}

module.exports = initializePassport;
