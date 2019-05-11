const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

const User = require('../models/users')
const userValidator = require('../middleware/userValidator')
const validate = require('../middleware/validate')
const auth = require('../middleware/auth')

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

    // send error message
    res.render('error', { msg: error.message })

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

// GET /users/me
router.get('/users/me', auth, async (req, res) => {

  try {

    // find user by id
    const user = await User.findById(req.user._id)

    // reject if user is not found
    if (!user) return res.status(404).render('error', { msg: 'User Not Found' })

    // send user data
    res.render('profile', { user })

  } catch (error) {

    // send error message
    res.render('error', { msg: error.message })
  }
})

// PATCH /users/me
router.patch('/users/me', [auth, validate(userValidator)], async (req, res) => {

  try {

    // get email and password
    const { email, password } = req.body

    // get user id
    const { id } = req.user

    // hash password
    const saltRounds = 10
    const hash = await bcrypt.hash(password, saltRounds)

    // check for duplicate user
    const duplicateUser = await User.findOne({ email })

    // reject if duplicate user
    if (duplicateUser) return res.status(400).render('error', { msg: 'User Already Exists' })

    // set updates and options
    const updates = { email, password: hash }
    const options = { new: true, runValidators: true }

    // update user
    const user = await User.findByIdAndUpdate(id, updates, options)

    // reject if no user is found
    if (!user) return res.status(404).render('error', { msg: 'User Not Found' })

    // redirect to users/profile
    res.redirect(`/users/me`)

  } catch {

    // send error message
    res.render('error', { msg: error.message })
  }
})

// DELETE /users/me
router.delete('/users/me', auth, async (req, res) => {

  try {
    
    // get user info
    const { user } = req

    // find and delete user
    const deletedUser = await req.user.remove()

    // send error message if user was not found
    if (!deletedUser) return res.status(404).render('error', { msg: 'User Not Found' })

    // delete cookie and redirect to /
    res.status(302).clearCookie('token').redirect('/')

  } catch (error) {

    // send error message
    res.render('error', { msg: error.message })
  }
})

// GET /users/login
router.get('/users/login', (req, res) => res.render('login'))

module.exports = router
