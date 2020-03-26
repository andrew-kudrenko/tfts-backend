const express = require('express')
const router = express.Router()
const { ObjectId } = require('mongoose').Types

const { connect, disconnect } = require('../../utils/mongo')
const Task = require('../../models/Task')

router.use((_, __, next) => {
  connect('/tasks')
  next()
})

router.route('/tasks')
  .get((_, res, next) => {
    Task.find({}, (err, data) => {
      if (err) res.status(501).end()

      disconnect()
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

      disconnect()
      res.end()
      next()
    })
  })
  
router.post('/tasks/update', (req, res, next) => {
  Task.findByIdAndUpdate(req.body._id, { ...req.body }, (err) => {
    if (err) res.status(501).end()

    disconnect()
    res.end()
    next()
  })
})

router.post('/tasks/remove', (req, res, next) => {
  Task.findByIdAndDelete(req.body._id, (err) => {
    if (err) res.status(501).end()

    disconnect()
    res.end()
    next()
  })
})

module.exports = router