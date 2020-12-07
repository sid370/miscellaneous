const express = require("express");
const app = express();
const port = 3000 || process.env.PORT;
const dbConnect = require("./db")
app.use(express.static("public"));
dbConnect()
const Comment = require("./models/comment")

app.use(express.json())
app.post('/api/comments',(req,res)=>{
    const comment = new Comment({
        username : req.body.username,
        comment: req.body.comment
    })
    comment.save()
    .then(resp=>{
        res.send(resp)
    })
})

app.get('/api/comments',(req,res)=>{
    Comment.find().then(comments=>{
        res.send(comments)
    })
})

server = app.listen(port, () => {
  console.log("Server up");
});

const io = require("socket.io")(server);

io.on("connection", (socket) => {
  socket.on("comment", (data) => {
    data.time = Date();
    socket.broadcast.emit("comment", data);
  });

  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
  });
});
