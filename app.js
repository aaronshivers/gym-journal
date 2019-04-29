const express = require('express')
const app = express()

const port = process.env.PORT || 3000

const indexRoutes = require('./routes/index')

app.use(indexRoutes)

app.listen(port, () => console.log(`Server running on port ${ port }.`))

module.exports = app
