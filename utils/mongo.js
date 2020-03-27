const mongoose = require('mongoose')
const config = require('config')

const password = config.get('db-config.password')
const connectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}

const connect = endPoint => {
  const dbUrl = config.get('db-config.db-url')

  mongoose.connect(
    dbUrl.replace('password', password).concat(endPoint),
    connectOptions
  )
}

const disconnect = () => mongoose.disconnect()

module.exports = { connect, disconnect }