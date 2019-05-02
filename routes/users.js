const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

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

    // create user
    const user = await new User({ email, password })

    // save user
    await user.save()

    // get auth token
    const token = await user.createAuthToken()

    // set cookie options
    const cookieOptions = { expires: new Date(Date.now() + 86400000), httpOnly: true  }

    // set header and return user info
    res.cookie('token', token, cookieOptions).redirect(`/users/me`)

  } catch (error) {

    throw new Error (error)

  }

})

// POST /users/login
router.post('/users/login', async (req, res) => {

  try {
    
    // get email and password
    const { email, password } = req.body

    // find user by email
    const user = await User.findOne({ email })

    // reject if user is not found
    if (!user) return res.status(401).render('error', { msg: 'User Not Found' })

    // verify user password
    const hash = await bcrypt.compare(password, user.password)

    // reject if password is incorrect
    if (!hash) return res.status(401).render('error', { msg: 'Please check your login credentials, and try again.' })

    // create token
    const token = await user.createAuthToken()

    // set cookie options
    const cookieOptions = { expires: new Date(Date.now() + 86400000) }

    // set cookie and redirect to /users/profile
    res.cookie('token', token, cookieOptions).status(200).redirect(`/users/me`)

  } catch (error) {

  // send error message
  res.render('error', { msg: error.message })

  }
})

module.exports = router
