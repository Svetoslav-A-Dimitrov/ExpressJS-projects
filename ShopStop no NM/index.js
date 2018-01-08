/**
 * Created by sve on 28.9.2017 г..
 */
const port = 3007
let enviroment = process.env.NODE_ENV || 'development' // process... От Cloud ако има такъв
const config = require('./config/config')
const database = require('./config/database.config')
const express = require('express')

let app = express()

database(config[enviroment])

require('./config/express')(app, config[enviroment])
require('./config/routes')(app)

app.listen(port)