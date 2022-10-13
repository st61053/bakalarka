require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");

const session = require("express-session");

const userRoutes = require("./routes/user");
const itemRoutes = require("./routes/items");

const passportSteam = require("passport-steam");
const SteamStrategy = passportSteam.Strategy;

const port = process.env.PORT;

// express app
const app = express();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: true,
    cookie: {
      httpOnly: true,
      maxAge: parseInt(process.env.SESSION_MAX_AGE),
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Initiate Strategy
require("./passport")(passport);

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

//app.use((req, res, next) => {
//  console.log(req.session);
//  next();
//});

// routes
app.use("/auth", userRoutes);
app.use("/api/items", itemRoutes);

// Calling the express.json() method for parsing
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    // listening for request
    app.listen(port, () => {
      console.log(`connected to db and listening on port: ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
