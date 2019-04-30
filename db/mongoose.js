const mongoose = require('mongoose')

const {
  MONGO_USER,
  MONGO_PASS,
  MONGO_CLUSTER,
  NODE_ENV
} = process.env

const encodedpass = encodeURIComponent(MONGO_PASS)
const url = `mongodb+srv://${ MONGO_CLUSTER }.mongodb.net`

options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  retryWrites: true,
  user: MONGO_USER,
  pass: encodedpass,
  dbName: NODE_ENV
}

mongoose.connect(url)
  .then(() => console.log(`Connected to ${ NODE_ENV } Database`))
  .catch(err => console.log(err))

module.exports = mongoose
