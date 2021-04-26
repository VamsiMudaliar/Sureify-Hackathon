const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  
  skills:[String],
  
  funfacts:[String],
  
  languages:[String],
  
  role:{
      type:String,
      required:true
  },
  location:{
      type:String,
      required:true
  },
  about:{
      type:String,
      required:true
  },
  profile_image:{
      type:String,
  },
  yoe:{
      type:Number,
      required:true
  },
  created_on:{
      type:Date,
      default: Date.now
  }
});

const Profile = mongoose.model('Profile', ProfileSchema);

module.exports = Profile;