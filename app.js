const app = require('express')()
const bodyParser = require('body-parser')

const port = process.env.PORT || 7000

const commonRouter = require('./routes/common-router')
const apiRouter = require('./routes/api-router')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((_, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  next()
})

app.use('/', commonRouter)
app.use('/api', apiRouter)

app.listen(port, () => console.log(`Server has been started on port ${port}`))