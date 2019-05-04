const mongoose = require('mongoose')

const Schema = mongoose.Schema

const exerciseSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 50
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 200
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true
  }
})

const Exercise = mongoose.model('Exercise', exerciseSchema)

module.exports = Exercise
