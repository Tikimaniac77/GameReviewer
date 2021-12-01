const router = require("express").Router();
const withAuth = require('../utils/auth');

router.get("/", withAuth, (req, res) => {
    // Redirect user to homepage
    res.redirect("/")
})

module.exports = router;