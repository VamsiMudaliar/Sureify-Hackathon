const mongoose = require('mongoose');
const ProfileSchema = require('./Profile')
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  articles:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Articles'
  }],
  profile:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Profile'
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;