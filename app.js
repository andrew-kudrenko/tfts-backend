const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const port = process.env.PORT || 7000

const apiRouter = require('./routes/api-router')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((_, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept')  
  next()
  // res.end()
})

app.use('/api', apiRouter)

app.listen(port, () => console.log(`Server has been started on port ${port}`))