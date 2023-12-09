const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");


// Display User create form on GET.
exports.user_create_get = asyncHandler(async (req, res, next) => {
  res.render('sign-up', { title: 'Sign Up' });
});

// Handle User create on POST.
/*
exports.user_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Author create POST");
});*/

exports.user_create_post = [
  // Validate and sanitize the name field.

  body("firstName")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Category name must be specified.")
    .isAlphanumeric()
    .withMessage("Category name has non-alphanumeric characters."),
  body("lastName")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Description must be specified.")
    .isAlphanumeric()
    .withMessage("Description has non-alphanumeric characters."),
  body("userName")
    .trim()
    .isLength({ min: 4 })
    .escape()
    .withMessage("UserName must be 4 characters.")
    .isAlphanumeric()
    .withMessage("Username has non-alphanumeric characters."),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .escape()
    .withMessage("Password must be at least 6 characters."),
    body('confirm').custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Passwords must match."),
  


  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a category object with escaped and trimmed data.
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
      password: req.body.password,

    });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render("sign-up", {
        title: "Sign Up",
        sign_up: user,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.
      // Check if Username already exists.
      const userNameExists = await User.findOne({ userName: req.body.userName }).exec();
      if (userNameExists) {
        // UserName exists, redirect to its detail page.
        res.render("sign-up", {
          title: "User Name Already Exists",
          sign_up: user,
          errors: errors.array(),
        });
      } else {
        await user.save();
        // New category saved. Redirect to category detail page.
        res.render('home', { title: 'Members Only' });
      }
    }
  }),
];


