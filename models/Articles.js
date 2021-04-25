const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  article_image:{
      type:String,
      required: true
  },
  created_on: {
    type: Date,
    default: Date.now
  },
  comments:[
      {
          type:mongoose.Schema.Types.ObjectId,
          ref:'Comments'
      }
    ]
});

const Articles = mongoose.model('Articles', ArticleSchema);

module.exports = Articles;