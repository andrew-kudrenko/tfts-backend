const express = require('express')
const router = express.Router()
const { ObjectId } = require('mongoose').Types

const { connect, disconnect } = require('../../utils/mongo')
const Task = require('../../models/Task')

router.route('/tasks')
  .all((_, __, next) => {
    connect('/tasks')
    next()
  })
  .get((_, res, next) => {
    Task.find({}, (err, data) => {
      if (err) res.status(501).end()

      res.send(data).end()
      next()
    })
  })
  .post((req, res, next) => {
    const { title, solution, condition, category } = req.body

    const task = new Task({
      _id: new ObjectId(),
      solution, condition,
      title, category
    })

    task.save(err => {
      if (err) res.status(501).end()

      res.end()
      next()
    })
  })
  .all((_, __, next) => {
    disconnect()
    next()
  })

router.route('/tasks/update')
  .all((_, __, next) => {
    connect('/tasks')
    next()
  })
  .post((req, res, next) => {
    const body = req.body
    Task.findByIdAndUpdate(body._id, { ...body }, (err) => {
      if (err) res.status(501).end()

      res.end()
      next()
    })
  })
  .all((_, __, next) => {
    disconnect()
    next()
  })

router.route('/tasks/remove')
  .all((_, __, next) => {
    connect('/tasks')
    next()
  })
  .post((req, res, next) => {
    Task.findByIdAndDelete(req.body._id, (err) => {
      if (err) res.status(501).end()

      res.end()
      next()
    })
  })
  .all((_, __, next) => {
    disconnect()
    next()
  })

module.exports = router