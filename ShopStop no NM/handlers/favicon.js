/**
 * Created by sve on 28.9.2017 г..
 */
const fs = require('fs')
const path = require('path')

module.exports = (req, res)=>{
  'use strict'
  if(req.pathname.endsWith('favicon.ico')){
    fs.readFile('./content/images/favicon.ico', (err, data)=>{
      if(err){
        console.log(err)
        return
      }
      res.writeHead(200)
      res.write(data)
      res.end()
    })
  }else {return true}
}