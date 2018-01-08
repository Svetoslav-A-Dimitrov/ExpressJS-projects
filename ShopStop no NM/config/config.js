/**
 * Created by sve on 6.10.2017 г..
 */
const path = require('path')
module.exports = {
  development: {connectionString: 'mongodb://localhost:27017/ShopStopDatabase',
  rootPath: path.normalize(path.join(__dirname, '../'))
  },
  production:{}
}