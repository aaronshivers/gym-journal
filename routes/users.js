const express = require('express')
const router = express.Router()

const User = require('../models/users')
const userValidator = require('../middleware/userValidator')
const validate = require('../middleware/validate')

// POST /users
router.post('/users', validate(userValidator), async (req, res) => {

  try {

    // get email and password from the body
    const { email, password } = req.body

    // check db for existing user
    const existingUser = await User.findOne({ email })
    if (existingUser) return res.status(400).render('error', { msg: 'User already registered.' })

    // send user
    res.send(req.user)

  } catch (error) {

    throw new Error (error)

  }

})

module.exports = router
