import './App.css';
import {TextareaAutosize,Button} from '@material-ui/core'
import {React,useState,useEffect} from 'react'

function createEl(data){

}



function App() {
  let username=""
  useEffect=(()=>{
    const name = prompt("Enter your name")
    username=name
  })
  return (
    <div className="App">
      {console.log(username)}
      <h3>Comment Box</h3>
      <TextareaAutosize aria-label="Write your comment here" style={{width: 600, padding: '2px'}} rowsMin={3} placeholder="Type"/><br/>
      <Button onClick={()=>createEl()} variant="contained" color="secondary">Post</Button>
      <h5>Comments</h5><br/>
      <ul style={{listStyleType:"none"}}>
        <li>John Doe</li><br/>
        <li>My Comment</li><br/>
        <li>11:30 PM</li>
      </ul>
    </div>
  );
}


export default App;
