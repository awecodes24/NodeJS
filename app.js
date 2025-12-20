const express = require("express")
const dbConnection = require("./database/connection")
const user = require("./models/userModel")
const blog = require("./models/blog")
const app = express()
const bcrypt = require("bcrypt")

dbConnection()
app.use(express.json()) //to parse json file


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
    try {
        //response ma user table ma vako data sent garnu paryo
        const data = await user.find()    //user.find() for all info, user.create() to get input, user.findByIdAndDelete(), user.findByIdAndUpdate();
        res.json({
            data : data //when variable name is same we can use single i.e. data only is enough
        })
    } catch (err) {
        res.status(500).json({ error: "Database connection failed" });
    }
})

app.get("/blogs", async (req,res)=>{
    try {
        //response ma user table ma vako data sent garnu paryo
        const blogs = await blog.find()    //user.find() for all info, user.create() to get input, user.findByIdAndDelete(), user.findByIdAndUpdate();
        res.json({
            blog : blogs //when variable name is same we can use single i.e. data only is enough
        })
    } catch (err) {
        res.status(500).json({ error: "Database connection failed" });
    }
})

app.post("/register",async (req, res)=>{
    // const name = req.body.name
    // const email = req.body.email
    // const password = req.body.password
    const {name, email, password} = req.body //object destructuring 
    console.log(name, email, password)
    await user.create({
        name : name,
        email : email,
        password : bcrypt.hashSync(password, 10)   //10 is salt rounds 
    })
    res.json({
        message : "User registered successfully!"   //response dinai parxa natra processing vairakhxa
    })
})

app.post ("/create-blog",async (req, res)=>{
    const {title, subtitle,description} = req.body 
    await blog.create({
        title,
        subtitle,
        description
    })
    res.json({
        message: "Blog created!"
    })
})

app.delete("/delete/:id", async (req,res)=>{
    const id = req.params.id
    await user.findByIdAndDelete(id)
    res.json({
        message : `User with ${id} is deleted!`
    })
})

app.delete("/blogs/delete/:id", async (req,res)=>{
    const id = req.params.id
    await blog.findByIdAndDelete(id)
    res.json({
        message : "Blog deleted"
    })
})

app.delete("/delete", async (req, res)=>{
    const id = req.body.id
    await user.findByIdAndDelete(id)
    res.json({
        message : "user deleted successfully!"
    })
})

app.listen(3000, function(){ //3000 is the port number and function() is callback function and listen is the method
    console.log("server has started at port 3000");
}) 