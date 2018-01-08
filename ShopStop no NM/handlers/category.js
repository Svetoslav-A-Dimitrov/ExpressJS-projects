/**
 * Created by sve on 6.10.2017 г..
 */
// const fs = require('fs')
// const qs = require('querystring')
const Category = require('../models/Category')
module.exports.addGet = (req, res)=> {
 res.render('category/add')
}

module.exports.addPost = (req, res)=> {
  let category = req.body
  Category.create(category).then(()=>{
    'use strict'
    res.redirect('/')
  })
}

module.exports.productByCategory = (req ,res)=>{
  'use strict'
  let categoryName = req.params.category
  Category.findOne({name: categoryName})
    .populate('products')
    .then(category =>{
      if(!category){
        res.sendStatus(404)
        return
      }
      res.render('category/products', {category: category})
    })
}