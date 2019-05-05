const mongoose = require('mongoose')

const Schema = mongoose.Schema

const workoutSchema = new Schema({
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
  isPublic: {
    type: Boolean,
    required: false,
    default: false
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true
  }
})

const Workout = mongoose.model('Workout', workoutSchema)

module.exports = Workout