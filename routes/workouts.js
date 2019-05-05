const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')


// POST /exercises
router.post('/workouts', auth, async (req, res) => {

    try {
        res.send('test message')
    }

    catch (error) {
        res.send('error message')
    }
})

module.exports = router