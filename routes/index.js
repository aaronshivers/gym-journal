const express = require('express')
const router = express.Router()

router.get('/', (req, res) => res.send(`Gym Journal`))

module.exports = router
