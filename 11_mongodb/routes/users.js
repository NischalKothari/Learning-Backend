const mongoose = require("mongoose")
const dbName = "practice"
const collectionName = "users"

mongoose.connect(`mongodb://127.0.0.1:27017/${dbName}`)

const userSchema = mongoose.Schema({
  username : String,
  name : String,
  age : Number
})

module.exports = mongoose.model(collectionName,userSchema);