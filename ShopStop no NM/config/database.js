/**
 * Created by sve on 28.9.2017 г..
 */
const fs = require('fs')
const path = require('path')
const dbPath = path.join(__dirname, '/database.json')

function getProducts () {
  if(!fs.existsSync(dbPath)){
    fs.writeFileSync(dbPath, '[]')
    return []
  }

  let json = fs.readFileSync(dbPath).toString()
  let products = JSON.parse(json)
  //console.log(products)
  return products
}

function saveProducts (products) {
  let json = JSON.stringify(products)
  fs.writeFileSync(dbPath, json)
}

// let products = [];
// let count = 1

module.exports.products = {}

module.exports.products.getAll = getProducts

module.exports.products.add = (product)=>{
  // 'use strict'
  // product.id = count++
  // products.push(product)

  let products = getProducts()
  product.id = products.length + 1
  products.push(product)
  saveProducts(products)
}

module.exports.products.findByName = (name)=>{
  // 'use strict'
  // let product = null
  // for(let p of products){
  //   if(p.name === name){
  //     return p
  //   }
  // }
  // return product

  return getProducts().filter(p => p.name.toLowerCase().includes(name))
}