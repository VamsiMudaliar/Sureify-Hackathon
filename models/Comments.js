const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  content:{
      type:String,
      required:true
  },
  created_on:{
      type:Date,
      default: Date.now
  },
  posted_by:{
    type:String,
    required:true
  },
  article:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Articles'
  }
});

const Comments = mongoose.model('Comments', CommentSchema);

module.exports = Comments;