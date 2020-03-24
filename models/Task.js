const { Schema, model, Types } = require('mongoose')

const taskSchema = new Schema({
  _id: Types.ObjectId,
  title: String,
  condition: String,
  solution: String,
  category: String
})

module.exports = model('Task', taskSchema)