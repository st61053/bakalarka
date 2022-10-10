const express = require("express");
const passport = require('passport');

const {
    logoutUser,
    getUser
} = require("../controllers/userController")

const router = express.Router();

// logout
router.get("/user", getUser);

// logout
router.get("/logout", logoutUser);

//login with steam
router.get("/steam", passport.authenticate("steam", { failureRedirect: '/' }));

router.get(
    "/steam/return",
    passport.authenticate("steam", { session: false }),
    (req, res) => {
        console.log('req, res');
        console.log(req.user);

        if (req.user) {
            req.session.user = req.user._json;
            res.redirect("http://localhost:3000/");
        }
    });


module.exports = router;