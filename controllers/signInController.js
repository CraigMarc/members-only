const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const passport = require("passport");
const bcrypt = require('bcryptjs')
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
var express = require('express');
var app = express();

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      console.log('hello')
      const user = await User.findOne({ userName: username });
      if (!user) {
        console.log('no user')
        return done(null, false, { message: "Incorrect username" });
        
      };
      const match = await bcrypt.compare(password, user.password);
      console.log(match)
      if (!match) {
        // passwords do not match!
        return done(null, false, { message: "Incorrect password" })
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    };
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch(err) {
    done(err);
  };
});

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));


// Display User sign in form on GET.
exports.sign_in_get = asyncHandler(async (req, res, next) => {
    res.render('log-in', { title: 'Log In' });
  });

  // Display User sign in form on Post.
  

exports.sign_in_post =
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/message/sign-in"
  })

