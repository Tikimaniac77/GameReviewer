const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GoogleUser = require('../models/').GoogleUser;
//const sequelize = require("../config/connection");
require('dotenv').config

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    GoogleUser.findOne({ where: { id: id } }).then((user) => {
        done(null, user);
    });
});

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENTID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/redirect",
        passReqToCallback   : true
        },
    function(request, accessToken, refreshToken, profile, done) {
    const userData = GoogleUser.findOne({ where: { googleID: profile.id } });

    if (!userData) {
        new GoogleUser({
            googleID: profile.id,
            name: profile.displayName,
            email: email,
        }).save().then((newUser) => {
            done(null, newUser);
        });
    }

    req.session.save(() => {
      req.session.userID = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });

    });

    return done(null, userData);
  }
));

module.exports = passport;
