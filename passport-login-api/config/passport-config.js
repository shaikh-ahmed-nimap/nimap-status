const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');



function initializePassport (passport) {
        passport.use(new LocalStrategy({
            usernameField: 'email',
            session: true
        }, 
        async (email, password, done) => {
            console.log('running strategy')
            try {
                const user = await User.findOne({where: {email: email}});
                if (!user) {
                    return done('Invalid email or password', false)
                }
                const isMatch = await user.verifyPassword(password, user.password);
                if (!isMatch) {
                    return done('Invalid email or password', false);
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
