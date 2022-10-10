require('dotenv').config();
const passportSteam = require('passport-steam');
const SteamStrategy = passportSteam.Strategy;

// Initiate Strategy

module.exports = function (passport) {
    passport.use(new SteamStrategy({
        returnURL: 'http://localhost:4000/auth/steam/return',
        realm: 'http://localhost:4000/',
        apiKey: process.env.STEAM_API_KEY
    }, function (identifier, profile, done) {
        process.nextTick(function () {
            profile.identifier = identifier;
            return done(null, profile);
        });
    }
    ));

    // Required to get data from user for sessions
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });
}