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
  const [state, setState] = useState(false);
  const [mainState,setMainState] = useState(false)

  function broadcastComment(data) {
    socket.emit("comment", data);
  }

  socket.on("commentRecieved", (data) => {
    console.log(data);
    comments.push(data);
    setMainState(!mainState)
    //setState(!state);
    //createEl(data);
  });
  //socket.on("commentRecieved",()=>setState(!state))

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
    //setState(!state);
    //setComment((comment) => comment.concat(append));
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

// let username = "";

// let comments = [];
// function App() {
//   const [comment, setComment] = useState([]);
//   let text = "";
//   let oldcomment = "";

//   function createEl() {
//     oldcomment = comment;
//     text=text.trim()
//     let append = {
//       username,
//       text,
//       time: "18:00",
//     };
//     if (text!==""){
//     setComment(append);
//     comments.push(append);
//     }
//   }

//   function socketCom(data){
//     oldcomment=comment
//     let append={
//       username,
//       data,
//       time: "18:00 P.M."
//     };
//     setComment(append)
//     comments.push(append)
//   }

//   return (
//     <div className="App">
//       {username === "" ? (username = getUsername()) : null}
//       <h1>Comment Box</h1>
//       <TextareaAutosize
//         aria-label="Write your comment here"
//         style={{ width: 600, padding: "2px" }}
//         rowsMin={3}
//         placeholder="Type"
//         onInput={(e) => (text = e.target.value)}
//       />
//       <br />
//       <Button
//         type="submit"
//         onClick={() => createEl()}
//         variant="contained"
//         color="secondary"
//       >
//         Post
//       </Button>
//       <h5 style={{fontSize: 20}}>Comments</h5>
//       <br />
//       {oldcomment !== comment
//         ? comments.map((data, index) =>
//             <ul style={{ listStyleType: "none" }} key={index}>
//                 <li>{data.username}</li><br/>
//                 <li>{data.text}</li><br/>
//                 <li>{data.time}</li>
//             </ul>
//           )
//         : null}
//     </div>
//   );
// }

// export default App;
