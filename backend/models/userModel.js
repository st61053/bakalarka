const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        steamid: String,
        communityvisibilitystate: Number,
        profilestate: Number,
        personaname: String,
        commentpermission: Number,
        profileurl: String,
        avatar: String,
        avatarmedium: String,
        avatarfull: String,
        avatarhash: String,
        lastlogoff: Number,
        personastate: Number,
        primaryclanid: String,
        timecreated: Number,
        personastateflags: Number,
        loccountrycode: String,
        locstatecode: String,
        loccityid: Number

    }
);

module.exports = mongoose.model('User', userSchema);