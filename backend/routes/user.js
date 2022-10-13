const express = require("express");
const passport = require("passport");

const mongoose = require("mongoose");
const User = require("../models/userModel");

const {
  logoutUser,
  getUser,
  isLoggedIn,
} = require("../controllers/userController");

const router = express.Router();

// get username and avatar from logged user or nothing
router.get("/", isLoggedIn);

// logout
router.get("/user", getUser);

// logout
router.get("/logout", logoutUser);

//login with steam
router.get("/steam", passport.authenticate("steam", { failureRedirect: "/" }));

router.get(
  "/steam/return",
  passport.authenticate("steam", { session: false }),
  async (req, res) => {
    if (req.user) {
      // add user to db
      await User.deleteOne({ steamid: req.user._json.steamid });
      User.create(req.user._json);
      // add user to session
      req.session.user = req.user._json;
      res.redirect("http://localhost:3000/");
    }
  }
);

module.exports = router;
