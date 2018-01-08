/**
 * Created by sve on 20.10.2017 г..
 */
const Category = require('../models/Category')
module.exports ={
  getView:(req, res)=>{
    res.render('categories/addCategory')
  },
  createCategory: (req, res)=> {
    let category ={
      name: req.body.category
    }


    Category.create(category).then(c =>{
      'use strict'
      res.redirect('/')
    })
  }
}