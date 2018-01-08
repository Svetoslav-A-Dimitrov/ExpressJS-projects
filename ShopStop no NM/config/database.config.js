/**
 * Created by sve on 6.10.2017 г..
 */
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

module.exports= (config) => {
  'use strict'
  mongoose.connect(config.connectionString)

  let database = mongoose.connection

  database.once('open', (err)=> {
    if(err){
      console.log(err)
      return
    }
    console.log('Connected')
  })
  require('../models/Product') //???!!!!
  require('../models/Category')
}