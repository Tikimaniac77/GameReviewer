const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require ("../models/user");
//const sequelize = require("../config/connection");
require('dotenv').config

passport.use(
new GoogleStrategy({
    // TODO ID and Secret for GoogleStrat
    clientID: process.env.GOOGLE_CLIENTID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/redirect",
}, (accessToken, refreshToken, profile, done) => {
    // TODO: Passport Callback Function
    User.findOne({ where: {id: profile.id } }).then((currentUser) => {
        if(currentUser){
            // already have this user
            console.log('user is: ', currentUser);
            
        } else {
            // if not, create user in our
            new User({
                name: profile.displayName,
                email: profile.email,
                password: profile.id
            }).save().then((newUser) => {
                console.log('created new user: ', newUser);
                
            });
        }
    });
})
);

module.exports = passport;
