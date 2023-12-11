const User = require("../models/user");
const Message = require("../models/message-model");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const passport = require("passport");


// Display User sign in form on GET.
exports.sign_in_get = asyncHandler(async (req, res, next) => {

  res.render('log-in', {
    title: 'Log In',
    message: req.session.messages
  });
});

// Display User sign in form on Post.

exports.sign_in_post =
  passport.authenticate("local", {
    successRedirect: "/message/logged-in",
    failureRedirect: "/message/sign-in",
    failureMessage: true
  })

// Display logged in page on GET.
exports.logged_in_home_get = asyncHandler(async (req, res, next) => {

  let allMessages = await Message.find()
  .populate("userName")
  .exec()

  res.render("logged-in", {
    title: "Members Only",
    user: req.user,
    message: allMessages

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



