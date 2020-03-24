const categoriesRouter = require('./api-routers/categories-router')
const tasksRouter = require('./api-routers/tasks-router')

const router = require('express').Router() 

router.use('/', [categoriesRouter, tasksRouter])

module.exports = router