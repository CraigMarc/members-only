const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Display User sign in form on GET.
exports.sign_in_get = asyncHandler(async (req, res, next) => {
    res.render('log-in', { title: 'Log In' });
  });

  // Display User sign in form on Post.
exports.sign_in_post = asyncHandler(async (req, res, next) => {
  res.send("route works");
});