var express = require('express');
var jwt = require('jsonwebtoken');
var config = require('../config/config');
var User = require('../models/users');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

// Login
router.post('/login', function(req, res, next) {
  User.findOne({
    username : req.body.username
  }, function(err, user) {
    if(err) {
      res.status(500).json({
        'response' : 500,
        'message' : "Internal Server Error"
      });

      return false;
    }

    if(!user.authenticate(req.body.password)) {
      res.status(500).json({
        'response' : 500,
        'message' : "Invalid username or passowrd"
      });

      return false;
    }

    var token = jwt.sign(user.toObj(), config.secret, {expiresIn: 60*60*5});

    res.status(200).json({
      'response' : 200,
      'message' : "Success",
      'user' : user.toObj(),
      'token' : token
    });
  });
});

// Signup
router.post('/signup', function(req, res, next) {
  var user = new User({
    username : req.body.username,
    password : req.body.password
  });

  user.save(function(err, silence) {
    if(err) {
      res.status(500).json({
        'response' : 500,
        'message' : "Internal Server Error"
      });

      return false;
    }

    var token = jwt.sign(user.toObj(), config.secret, {expiresIn: 60*60*5});

    res.status(200).json({
      'response' : 200,
      'message' : "Success",
      'user' : user.toObj(),
      'token' : token
    });
  });
});

module.exports = router;