/**
 * Created by sve on 28.9.2017 г..
 */
//const url = require('url')
const fs = require('fs')
const path = require('path')

let getContentType = (url) =>{
  'use strict'
  let contentType = 'text/plain'
  if(url.endsWith('.css')){
    contentType = 'text/css'
  }else if(url.endsWith('.js')){
    contentType = 'application/javascript'
  }
  // else if(url.endsWith('.ico')){
  //   contentType = 'image/x-icon'
  // }
  return contentType
}

module.exports = (req, res)=>{
  'use strict'

  if(req.pathname.startsWith('/content') &&req.method === 'GET'){
    let filePath = path.normalize(
      path.join(__dirname, `..${req.pathname}`))
    fs.readFile(filePath, (err, data)=>{
      if(err){
        console.log(err)
        res.writeHead(404, {
          'content-type': 'text/plain'
        })
        res.write('Resource not found')
        res.end()
        return
      }
      res.writeHead(200,{
        'content-type': getContentType(req.pathname)
      })
      res.write(data)
      res.end()
    })
  }else {return true}
}