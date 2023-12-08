var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Members Only' });
});

//get sign up form
router.get('/sign-up', function(req, res, next) {
  res.render('sign-up', { title: 'Members Only' });
});


module.exports = router;
