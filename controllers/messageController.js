const message = require("../models/message");
const asyncHandler = require("express-async-handler");

// home page
exports.index = asyncHandler(async (req, res, next) => {
  res.render('home', { title: 'Members Only' });
});

 // Display new message form on GET.
 exports.new_message_get = asyncHandler(async (req, res, next) => {
  console.log(req.user)
  res.render("message-form", {
    title: "New Message",
   
    
  });
});