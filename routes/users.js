'use strict';

var express = require('express');
var User = require('../models/users.js');

var router = express.Router();

// GET users listing
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// SET user
router.post('/', function(req, res, next) {
  var user = new User({
    username : req.body.username,
    password : req.body.password
  });

  user.save(function(err, silence) {
    if(err) {
      console.log(err);
      throw err;
    }

    res.send(200, user);
  });
});

module.exports = router;
