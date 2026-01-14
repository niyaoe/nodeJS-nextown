const express = require("express");
const connection = require("./MDB/config");


const app = express()
connection();

app.use((req,res,next)=>{
    console.log("this is application middleware function (anonymous)");
    next()
})

app.get("/amw",(req,res)=>{
    res.send("middleware");
    
})




const PORT = 5002
app.listen(PORT,console.log(`server is ok ${PORT}`));