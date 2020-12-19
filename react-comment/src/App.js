import "./App.css";
import { TextareaAutosize, Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";

function getUsername() {
  const name = prompt("Enter your name");
  return name;
}

let comments = [];

export default function App() {
  let text = "";
  var socket = io("localhost:3001");
  const [mainState,setMainState] = useState(false)

  function broadcastComment(data) {
    socket.emit("comment", data);
  }

  useEffect(()=>{
    socket.on("commentRecieved", (data) => {
    console.log(data);
    comments.push(data);
    setMainState(!mainState)
  });
  })

  async function createEl(data) {
    let username = getUsername();
    const append = {
      username,
      data,
      time: "18:00 P.M.",
    };
    comments.push(append);
    broadcastComment(append);
    setMainState(!mainState)
  }

  return (
    <div className="App">
      <h1>Comment Box</h1>
      <TextareaAutosize
        aria-label="Write your comment here"
        style={{ width: 600, padding: "2px" }}
        rowsMin={3}
        placeholder="Type"
        onInput={(e) => (text = e.target.value)}
      />
      <br />
      <Button
        type="submit"
        onClick={() => createEl(text)}
        variant="contained"
        color="secondary"
      >
        Post
      </Button>
      <h5 style={{ fontSize: 20 }}>Comments</h5>
      <br />
      {comments.map((data, i) => {
        return (
          <ul style={{ listStyleType: "none" }} key={i}>
            <li style={{ color: "red" }}>{data.username}</li>
            <br />
            <li>{data.data}</li>
            <br />
            <li>{data.time}</li>
            <hr style={{ width: "60%", height: "5px" }}></hr>
          </ul>
        );
      })}
      {}
    </div>
  );
}