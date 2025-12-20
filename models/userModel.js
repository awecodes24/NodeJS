const mongoose = require("mongoose")
const schema = mongoose.Schema //schema is the class for table construction

const userSchema = new schema({
    name : String,
    email : String,
    password : String
}) 

const user = mongoose.model("user", userSchema)

module.exports = user 
