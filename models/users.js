var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/mini');

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

UserSchema.methods.toObj = function() {
  var obj = {
    'username' : this.username
  };

  return obj;
};

var User = mongoose.model('User', UserSchema);

module.exports = User;