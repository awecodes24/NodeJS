const express = require("express")
const app = express()

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


app.listen(3000, function(){ //3000 is the port number and function() is callback function and listen is the method
    console.log("server has started at port 3000");
}) 