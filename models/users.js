var mongoose = require('mongoose');
var config = require('../config/config');
var crypto = require('crypto');
var Schema = mongoose.Schema;

mongoose.connect(config.db);

var UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  hashed_password: {
    type: String,
    required: true
  },
  salt: String
});


//Virtuals
UserSchema.virtual('password').set(function(password) {
  this._password = password;
  this.salt = this.makeSalt();
  this.hashed_password = this.hashPassword(password);
}).get(function() {
  return this._password;
});

// METHODS
UserSchema.methods.toObj = function() {
  var obj = this.toObject();

  delete obj.hashed_password;
  delete obj.salt;

  return obj;
};

UserSchema.methods.authenticate = function(plainText) {
  return this.hashPassword(plainText) === this.hashed_password;
};

UserSchema.methods.makeSalt = function() {
  return crypto.randomBytes(16).toString('base64');
};

UserSchema.methods.hashPassword = function(password) {
  if (!password || !this.salt) return '';
  var salt = new Buffer(this.salt, 'base64');
  return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
};

var User = mongoose.model('User', UserSchema);

module.exports = User;