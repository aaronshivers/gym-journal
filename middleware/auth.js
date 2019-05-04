const jwt = require('jsonwebtoken')
const { User } = require('../models/users')

// auth middleware
module.exports = async (req, res, next) => {

    try {
    // get token from cookies
    const token = req.cookies.token

    // reject if token doesn't exist
    if (!token) return res.status(401).render('error', { msg: 'Access Denied! No Token Provided.' })

    } catch (error) {
    
        // send error message
        res.status(400).render('error', { msg: 'Access Denied! Invalid Token.' })
      }
}