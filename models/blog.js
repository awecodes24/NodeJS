// title, subtile, description should be added in table
import mongoose from "mongoose"
const schema = mongoose.Schema

const blogSchema = new schema({
    title : String,
    subtitle : String,
    description : String
})

const blog = mongoose.model("blog", blogSchema)

export default blog