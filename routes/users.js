const express = require('express')
const router = express.Router()

const userValidator = require('../middleware/userValidator')
const validate = require('../middleware/validate')

// POST /users
router.post('/users', validate(userValidator), (req, res) => res.send(req.user))

module.exports = router
