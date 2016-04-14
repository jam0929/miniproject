var express = require('express');
var jwt = require('jsonwebtoken');
var config = require('../config/config');
var User = require('../models/users');

var router = express.Router();

// GET me
router.get('/me', function(req, res, next) {
  var token = req.query.token;
  var decode = jwt.verify(token, config.secret);
  var username = decode.username;

  User.findOne({
    username : username
  }, function(err, user) {
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
      'user' : user.toObj()
    });
  });
});

// GET user
router.post('/:username', function(req, res, next) {
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

    res.status(200).json({
      'response' : 200,
      'message' : "Success",
      'user' : user.toObj()
    });
  });
});

module.exports = router;
