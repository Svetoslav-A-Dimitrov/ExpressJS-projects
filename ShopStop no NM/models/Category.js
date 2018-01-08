/**
 * Created by sve on 6.10.2017 г..
 */
const mongoose = require('mongoose')

let categoriSchema = mongoose.Schema({
  name:{type: String, required:true, unique: true},
  products:[{type: mongoose.Schema.ObjectId, ref: 'Product'}]
})

let Category = mongoose.model('Category', categoriSchema)

module.exports = Category