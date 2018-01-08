/**
 * Created by sve on 20.10.2017 г..
 */
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const userSchema = new mongoose.Schema({
  name:{type: String, required:true, unique: true}
});

const Category = mongoose.model('Category', userSchema);


module.exports = Category;