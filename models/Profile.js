const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  skills:[String],
  role:{
      type:String,
      required:true
  },
  languages:[String],
  location:{
      type:String,
      required:true
  },
  about:{
      type:String,
      required:true
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

const Profile = mongoose.model('Profile', ProfieSchema);

module.exports = Profile;