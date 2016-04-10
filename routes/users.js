var express = require('express');
var User = require('../models/users.js');

var router = express.Router();

// GET users listing
router.get('/', function(req, res, next) {
  console.log(req.query.username+ ", " + req.query.password);

  User.findOne({
    username : req.query.username,
    password : req.query.password
  }, function(err, user) {
    if(err) {
      res.status(500).json({
        'response' : 500,
        'message' : "Internal Server Error"
      });
    }

    console.log(user);

    res.status(200).json({
      'response' : 200,
      'message' : "Success",
      'user' : user.toObj()
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
    }

    res.status(200).json({
      'response' : 200,
      'message' : "Success",
      'user' : user.toObj()
    });
  });
});

module.exports = router;
