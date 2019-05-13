const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const validate = require('../middleware/validate')
const exerciseValidator = require('../middleware/exerciseValidator')
const Exercise = require('../models/exercises')

// POST /exercises
router.post('/exercises', [auth, validate(exerciseValidator)], async (req, res) => {

  try {

    // get name and description from the body
    const { name, description } = req.body

    // check db for existing exercise
    const existingExercise = await Exercise.findOne({ name })
    if (existingExercise) return res.status(400).render('error', { msg: 'Exercise already created.' })

    // get user id
    const { _id } = req.user

    // create new exercise
    const exercise = new Exercise({ name, description, creator: _id })

    // save exercise
    await exercise.save()

    // send exercise data
    res.send(exercise)

  } catch (error) {

  // send error message
  res.render('error', { msg: error.message })

  }
})

module.exports = router