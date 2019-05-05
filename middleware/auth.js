const jwt = require('jsonwebtoken')
const User = require('../models/users')

// auth middleware
module.exports = async (req, res, next) => {

  try {

    // get token from cookies
    const token = req.cookies.token

    // reject if token doesn't exist
    if (!token) return res.status(401).render('error', { msg: 'Access Denied! No Token Provided.' })

    // get secret from env
    const secret = process.env.JWT_SECRET

    // jwt options
    const options = { maxAge: '1d' }

    // verify token against the secret
    const decoded = await jwt.verify(token, secret, options)

    // find user by id
    const user = await User.findById(decoded._id)

    // reject if no user is found in the DB
    if (!user) throw new Error()

    // set req.user to hold the user data
    req.user = user

    // move to next middleware
    next()

  } catch (error) {
  
    // send error message
    res.status(400).render('error', { msg: 'Access Denied! Invalid Token.' })
  }
}