const express = require('express')
const router = express.Router()
const { ObjectId } = require('mongoose').Types

const { connect, disconnect } = require('../../utils/mongo')

const Category = require('../../models/Category')

router.route('/categories')
  .all((_, __, next) => {
    connect('/categories')
    next()
  })
  .get((_, res, next) => {
    Category.find({}, (err, data) => {
      if (err) res.status(501).end()

      res.send(data).end()
      next()
    })
  })
  .post((req, res) => {
    const { title, alias, description, preview, img } = req.body

    const category = new Category({
      _id: new ObjectId(),
      title, alias, description,
      preview, img
    })

    category.save(err => {
      if (err) res.status(501).end()

      res.end()
      next()
    })
  })
  .delete((req, _, next) => {
    Category.findByIdAndDelete(req.body._id, (err) => {
      if (err) console.log(err)
      next()
    })
  })
  .patch((req, _, next) => {
    Category.findByIdAndUpdate(req.body._id, { ...req.body }, (err) => {
      if (err) console.log(err)
      next()
    })
  })
  .all((_, __, next) => {
    disconnect()
    next()
  })

module.exports = router