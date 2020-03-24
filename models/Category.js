const { Schema, Types, model } = require('mongoose')

const categorySchema = new Schema({
  _id: Types.ObjectId,
  title: String,
  alias: String,
  description: String,
  preview: String,
  img: String
})

module.exports = model('Category', categorySchema)
