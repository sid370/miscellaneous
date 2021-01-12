const express  = require('express')
const app = express()
const fs = require('fs')
const cors = require("cors")

app.use(cors())

app.get("/",(req,res)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,PATCH")
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Headers','X-Requested-With,content-type,Origin,Accept,Authorization')
    res.setHeader('Content-Type','video/mp4')
    var rs = fs.createReadStream('video.mp4')
    rs.pipe(res)
})

app.listen(3000,()=>{
    console.log("Server working")
})