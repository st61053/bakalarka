const mongoose = require('mongoose');
const User = require("../models/userModel");

const passport = require("passport");

const logoutUser = async (req, res) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        req.session.destroy();
        res.redirect("http://localhost:3000/");
    });
}

const getUser = async (req, res) => {
    if (req.session.user) {
        res.status(200).json({
            user: req.session.user
        });
    } else {
        res.status(200);
    }
}

module.exports = {
    logoutUser,
    getUser
}

