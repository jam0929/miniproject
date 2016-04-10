var express = require('express');
var jwt = require('jwt-simple');
var config = require('../config/config');
var User = require('../models/users');

var router = express.Router();

// GET users listing
router.get('/', function(req, res, next) {
  User.findOne({
    username : req.query.username
  }, function(err, user) {
    if(err) {
      res.status(500).json({
        'response' : 500,
        'message' : "Internal Server Error"
      });

      return false;
    }

    if(!user.authenticate(req.query.password)) {
      res.status(500).json({
        'response' : 500,
        'message' : "Invalid username or passowrd"
      });

      return false;
    }

    res.status(200).json({
      'response' : 200,
      'message' : "Success",
      'user' : user.toObj(),
      'token' : jwt.encode(user.toObj(), config.secret)
    });
  });
});

// SET user
router.post('/', function(req, res, next) {
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

    res.status(200).json({
      'response' : 200,
      'message' : "Success",
      'user' : user.toObj(),
      'token' : jwt.encode(user.toObj(), config.secret)
    });
  });
});

module.exports = router;
