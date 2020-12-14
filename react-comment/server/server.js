const express = require ("express")
const app = express()
const port = 3001||process.env.PORT
var cors = require ("cors")

app.use(cors())
server = app.listen(port,()=>{
    console.log("server listening")
})

app.get("/",(req,res)=>{
    res.status(200).json({
        message: "Server Working"
    })
})


const io=require("socket.io")(server)

io.on("connection",(socket)=>{
    console.log(socket.id)
    
    socket.on("comment",(data)=>{
        socket.broadcast.emit("commentRecieved",data)
    })
})