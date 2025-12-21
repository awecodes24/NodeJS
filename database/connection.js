import mongoose from "mongoose" //Alternative const mongoose = require("mongoose")

async function dbConnection(){
    await mongoose.connect(process.env.CONNECTION_STRING) //always use process.env for .env file access
    console.log("DB connected successfully!!!!")
}

export default dbConnection //Alternative: module.exports = dbConnection