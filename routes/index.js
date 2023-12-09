var express = require('express');
var router = express.Router();


// GET home page.
router.get("/", function (req, res) {
  res.redirect("/message");
});





//get sign up form
router.get('/sign-up', function (req, res, next) {
  res.render('sign-up', { title: 'Sign Up' });
});





  
//get log in form
router.get('/log-in', function (req, res, next) {
  res.render('log-in', { title: 'Log In' });
});

//get message form
router.get('/message-form', function (req, res, next) {
  res.render('message-form', { title: 'New Message' });
});

module.exports = router;
