const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    minlength: 8,
    maxlength: 100
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
    maxlength: 100
  },
  isAdmin: {
    type: Boolean,
    required: false,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User
