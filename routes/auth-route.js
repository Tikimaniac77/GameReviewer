const router = require('express').Router();
const passport = require('passport');

router.get("/google", passport.authenticate("google", {
    //Handle redirect with passport
    scope: ['email', 'profile']
}));

// Callback route for google redirection
router.get('/google/redirect',  passport.authenticate("google"), (req, res) => {
    // Add a redirection page after user is authenticated
    res.redirect("/profile");
});

module.exports = router;
