/**
 * Created by sve on 29.9.2017 г..
 */
const fs = require('fs')
const Product = require('../models/Product')
const Category = require('../models/Category')

module.exports.addGet = (req, res)=> {
  'use strict'
    Category.find().then((categories) => {
        res.render('products/add', {categories: categories})
  })
}
module.exports.addPost = (req, res)=> {
  'use strict'
  let productObj = req.body
  productObj.image = '\\' + req.file.path // will not work if no image uploaded

  Product.create(productObj).then((product)=>{
            Category.findById(product.category).then(category =>{
              category.products.push(product._id)
              category.save()
            })
    res.redirect('/')
  })
}

module.exports.editGet = (req, res)=>{
  'use strict'
  let id = req.params.id
  Product.findById(id).then((product)=>{
    if(!product){
      res.sendStatus(404)
      return
    }

    Category.find().then((categories)=>{
      res.render('products/edit',{
        product: product,
        categories: categories
      })
    })
  })
}

module.exports.editPost = (req, res)=>{
  'use strict'
  let id = req.params.id
  let editedProduct = req.body

  Product.findById(id).then(product=>{
    if(!product){
      res.redirect(`
      /?error=${encodeURIComponent('error=Product was not found!')}`)
      return
    }

    product.name = editedProduct.name
    product.description = editedProduct.description
    product.price = editedProduct.price

    if(req.file){
      product.image = '\\' + req.file.path
    }

    if(product.category.toString() !== editedProduct.category){
      Category.findById(product.category).then((currentCategory)=>{
       Category.findById(editedProduct.category).then((nextCategory)=>{
         let index = currentCategory.products.indexOf(product._id)
         if(index >= 0){
           //Remove product specified from current
           // category's list of products
           currentCategory.products.splice(index, 1)
         }
         currentCategory.save()

         //Add product's reference to the 'new category.'
         nextCategory.products.push(product._id)
         nextCategory.save()

         product.category = editedProduct.category

         product.save().then(()=>{
           res.redirect('/?success=' + encodeURIComponent('Product was edited successfully'))
         })
       })
      })
    }else {
      product.save().then(()=>{
        res.redirect('/?success=' + encodeURIComponent('Product was edited successfully'))
      })
    }
  })
}

module.exports.deleteGet = (req, res)=>{
  'use strict'
  let id = req.params.id

  Product.findById(id).then((product)=>{
    if(!product){
      res.sendStatus(404)
      return
    }
    res.render('products/delete', {product: product})
  })
}

module.exports.deletePost = (req, res)=>{
  'use strict'
  let id = req.params.id

  Product.findById(id)
    .then(product=>{
    Category.findById(product.category).then(category =>{
      let index = category.products.indexOf(product._id)
      if(index >= 0){
        category.products.splice(index, 1)
      }
      category.save().then(
        Product.findById(id).remove()
          .then(res.redirect('/?success=' + encodeURIComponent('Product was deleted successfully')))
      )
    }).catch(err => console.log(err))
  })
}

module.exports.buyGet = (req, res)=>{
  'use strict'
  let id = req.params.id

  Product.findById(id).then((product)=>{
    if(!product){
      res.sendStatus(404)
      return
    }
    res.render('products/buy', {product: product})
  })
}
