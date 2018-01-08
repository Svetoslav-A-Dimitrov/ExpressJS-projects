/**
 * Created by sve on 19.10.2017 г..
 */
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const userSchema = new mongoose.Schema({
  user:{type: String},
  title:{type: String, required: true},
  comment:{type: String},
  datePosted:{type: Date, default: Date.now()},
  hotel:{type: ObjectId, ref: 'Hotel'}
});

const Comment = mongoose.model('Comment', userSchema);


module.exports = Comment;