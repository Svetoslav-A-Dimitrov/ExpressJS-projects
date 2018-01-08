/**
 * Created by sve on 28.9.2017 г..
 */
const homeHandler = require('./home')
const addHandler = require('./products')
const categoryHandler = require('./category')
module.exports = { home: homeHandler, product: addHandler, category: categoryHandler}