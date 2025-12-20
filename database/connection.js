const mongoose  = require("mongoose")

async function dbConnection(){
    await mongoose.connect("mongodb+srv://nodejsworkshop:abhinashyadav@cluster0.hoti6vg.mongodb.net/?appName=Cluster0")
    console.log("DB connected successfully!!!!")
}

module.exports = dbConnection