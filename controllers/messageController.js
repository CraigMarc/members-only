const Message = require("../models/message");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// home page
exports.index = asyncHandler(async (req, res, next) => {
  res.render('home', { title: 'Members Only' });
});

 // Display new message form on GET.
 exports.new_message_get = asyncHandler(async (req, res, next) => {
  
  res.render("message-form", {
    title: "New Message",
   
  });
});

// new message on post.
/*
exports.new_message_post = asyncHandler(async (req, res, next) => {
  
 res.send('not done')
   
  
});*/

exports.new_message_post = [
  // Validate and sanitize the name field.

  body("title")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Title name must be specified.")
    .isAlphanumeric()
    .withMessage("Title name has non-alphanumeric characters."),
  body("text")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Message must be specified."),
    
  

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Book object with escaped and trimmed data.
    let currentDate = new Date();

    const message = new Message({
      title: req.body.title,
      text: req.body.text,
      timeStamp: currentDate,
      userName: req.user,
      
    });
  
      if (!errors.isEmpty()) {
        // There are errors. Render the form again with sanitized values/error messages.
        res.render("message-form", {
          title: "New Message",
          errors: errors.array(),
        });
        return;

    } else {
      // Data from form is valid. Save book.
      await message.save();
      res.redirect("/message/logged-in");
    }
  }),
];
