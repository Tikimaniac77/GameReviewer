const router = require("express").Router();

const authCheck = (req, res, next) => {
    if(!req.user){
        // If user is not logged in redirect to login
        res.redirect("/login");
    } else {
        // Continue if logged in
        next();
    }
};

router.get("/", authCheck, (req, res) => {
    // Redirect user to homepage
    res.redirect("/homepage")
})