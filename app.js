const express = require('express')
const app = express()

const port = process.env.PORT || 3000

const indexRoutes = require('./routes/index')
const usersRoutes = require('./routes/users')

app.use(express.json())

app.use(indexRoutes)
app.use(usersRoutes)

app.listen(port, () => console.log(`Server running on port ${ port }.`))

module.exports = app
