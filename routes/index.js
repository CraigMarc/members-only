var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Members Only' });
});

//get sign up form
router.get('/sign-up', function(req, res, next) {
  res.render('sign-up', { title: 'Sign Up' });
});

//get log in form
router.get('/log-in', function(req, res, next) {
  res.render('log-in', { title: 'Log In' });
});

module.exports = router;
