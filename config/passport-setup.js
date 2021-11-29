const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GoogleUser = require ("../models/user")
//const sequelize = require("../config/connection");
require('dotenv').config

passport.serializeUser((user, done) => {
 done(null, user.id);
});

passport.deserializeUser((id, done) => {
    GoogleUser.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
new GoogleStrategy({
    // TODO ID and Secret for GoogleStrat
    clientID: process.env.GOOGLE_CLIENTID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/redirect",
}, (accessToken, refreshToken, profile, done) => {
    // TODO: Passport Callback Function
    GoogleUser.findOrCreate({ 
        where: { googleId: profile.id }, 
        defaults: {
            googleId: profile.id, 
            name: profile.displayName},
    },
        function (err, user) {
            done(err, user);
})
}));

module.exports = passport;
