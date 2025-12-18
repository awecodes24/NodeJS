const express = require("express")
const app = express()



app.listen(3000, function(){ //3000 is the port number and function() is callback function
    console.log("server has started at port 3000");
})