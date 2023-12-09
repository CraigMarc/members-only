const message = require("../models/message");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  res.render('home', { title: 'Members Only' });
});