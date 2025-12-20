// title, subtile, description should be added in table
const mongoose = require("mongoose")
const schema = mongoose.Schema

const blogSchema = new schema({
    title : String,
    subtitle : String,
    description : String
})

const blog = mongoose.model("blog", blogSchema)

module.exports = blog