require('dotenv').config()

const express = require('express')
const mongoose = require('./db/mongoose')
const cookieParser = require('cookie-parser')

const app = express()
const port = process.env.PORT || 3000

const indexRoutes = require('./routes/index')
const usersRoutes = require('./routes/users')
const exercisesRoutes = require('./routes/exercises')
const workoutsRoutes = require('./routes/workouts')

app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(indexRoutes)
app.use(usersRoutes)
app.use(exercisesRoutes)
app.use(workoutsRoutes)

app.listen(port, () => console.log(`Server running on port ${ port }.`))

module.exports = app
