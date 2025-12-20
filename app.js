const express = require("express")
const dbConnection = require("./database/connection")
const user = require("./models/userModel")
const blog = require("./models/blog")
const app = express()

dbConnection()

app.get("/", function(req,res){ 
    res.json({   //json is the standard file for data transferring
        name : "home page"
    })
})

app.get("/about",(req,res)=>{
    res.json ({
        address: "about page address",
        age: 20,
        name : "abhinash"
    })
})

app.get("/greet",(req,res)=>{
    res.json({
    greet: "Namaste World!!"
    })
})

app.get("/fetch-users", async (req,res)=>{
    //response ma user table ma vako data sent garnu paryo
    const data = await user.find()    //user.find() for all info, user.create() to get input, user.findByIdAndDelete(), user.findByIdAndUpdate();
    res.json({
        data : data //when variable name is same we can use single i.e. data only is enough
    })
})

app.get("/blogs", async (req,res)=>{
    //response ma user table ma vako data sent garnu paryo
    const blog = await blog.find()    //user.find() for all info, user.create() to get input, user.findByIdAndDelete(), user.findByIdAndUpdate();
    res.json({
        blog : blog //when variable name is same we can use single i.e. data only is enough
    })
})

app.listen(3000, function(){ //3000 is the port number and function() is callback function and listen is the method
    console.log("server has started at port 3000");
}) 