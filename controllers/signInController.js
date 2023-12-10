const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const passport = require("passport");


// Display User sign in form on GET.
exports.sign_in_get = asyncHandler(async (req, res, next) => {
    res.render('log-in', { title: 'Log In' });
  });

  // Display User sign in form on Post.
  

exports.sign_in_post =
  passport.authenticate("local", {
    successRedirect: "/message/logged-in",
    failureRedirect: "/message/sign-in"
  })

  // Display logged in page on GET.
exports.logged_in_home_get = asyncHandler(async (req, res, next) => {
  console.log(req.user)
  res.render("logged-in", {
    title: "Members Only",
    user: req.user,
    
  });
});

// display home on log out

exports.log_out_get = asyncHandler(async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});


