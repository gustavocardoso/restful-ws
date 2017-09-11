const mysqlServer = require('mysql')

const connection = mysqlServer.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'restful_ws'
})

const errorHandler = (error, msg, rejectFunction) => {
  console.error(error)
  rejectFunction({ erorr: msg })
}

const categoryModule = require('./categories')({ connection, errorHandler })

module.exports = {
  categories: () => categoryModule
}