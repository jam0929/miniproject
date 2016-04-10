var mongoose = require('mongoose');
var config = require('../config/config');
var Schema = mongoose.Schema;

mongoose.connect(config.db);

var UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
});

// METHODS
UserSchema.methods.toObj = function() {
  var obj = this.toObject();

  delete obj.password;

  return obj;
};

var User = mongoose.model('User', UserSchema);

module.exports = User;