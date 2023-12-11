const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs')

// Display User create form on GET.
exports.user_create_get = asyncHandler(async (req, res, next) => {
  res.render('sign-up', { title: 'Sign Up' });
});

// Handle User create on POST.


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



    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render("sign-up", {
        title: "Sign Up",
        
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
        
        bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
          // if err, do something
          if (err) {
            return console.log('Cannot encrypt');
          }
          // otherwise, store hashedPassword in DB
          const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            password: hashedPassword
          })
          await user.save()
        });

        // New user saved redirect home.
        res.redirect('/message');
      }
    }
  }),
];

// Display User admin signup form on GET.
exports.admin_sign_up_get = asyncHandler(async (req, res, next) => {

  res.render('admin-signup', {
    title: 'Admin Sign Up',
    message: req.session.messages
  });
});

// Post for admin signup.


  exports.admin_sign_up_post = [
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
  
  
  
      if (!errors.isEmpty()) {
        // There are errors. Render the form again with sanitized values/error messages.
        res.render("sign-up", {
          title: "Sign Up",
          
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
          
          bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
            // if err, do something
            if (err) {
              return console.log('Cannot encrypt');
            }
            // otherwise, store hashedPassword in DB
            const user = new User({
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              userName: req.body.userName,
              password: hashedPassword,
              admin: true
            })
            await user.save()
          });
  
          // Admin saved redirect home.
          res.redirect('/message');
        }
      }
    }),
  ];
