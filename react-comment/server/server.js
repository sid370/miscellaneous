const express = require ("express")
const app = express()
const port = 3001||process.env.PORT

const server = app.listen(port,()=>{
    console.log("server listening")
})

const io=require("socket.io-client")(server)

io.on("connection",(socket)=>{
    console.log(socket.id)
    socket.on("comment",(data)=>{
        socket.broadcast.emit("comment",data)
    })
})