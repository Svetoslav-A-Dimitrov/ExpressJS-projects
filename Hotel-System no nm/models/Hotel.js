/**
 * Created by sve on 19.10.2017 г..
 */
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const userSchema = new mongoose.Schema({
  views:{type: Number},
  user:{type: ObjectId, ref: 'User'},
  title:{type: String, required: true},
  description:{type: String},
  location:{type: String},
  image:{type:String},
  dateCreation:{type: Date, default: Date.now()},
  comments:[{type: ObjectId, ref: 'Comment'}],
  like:[{type: ObjectId, ref: 'User'}],
  category:{type: String}
});

const Hotel = mongoose.model('Hotel', userSchema);


module.exports = Hotel;
