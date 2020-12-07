let username;
let socket = io();
do {
  username = prompt("Enter your name");
} while (!username);

const textarea = document.querySelector("#textarea");
const submitBtn = document.querySelector("#submitBtn");
const commentBox = document.querySelector(".comment_box");

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let comment = textarea.value;
  if (!comment) {
    return;
  }
  postComment(comment);
});

function postComment(comment) {
  let data = {
    username,
    comment,
  };
  appendtoDom(data);
  textarea.value=""
  textarea.focus()

  broadcastComment(data);

  syncwithDB(data);
}

function appendtoDom(data) {
  let lTag = document.createElement("li");
  lTag.classList.add("comment", "mb-3");
  let markup = `
        <div class="card border-light mb-3">
            <div class="card-body">
                        <h6>${data.username}</h6>
                        <p>${data.comment}</p>
                        <div>
                            <img src="/img/clock.png" alt="clock">
                            <small>${moment(data.time).format("LT")}</small>
                        </div>
                    </div>
                </div>
    `;
  lTag.innerHTML = markup;
  commentBox.prepend(lTag);
}


function broadcastComment(data){
  socket.emit('comment',data)
}

socket.on('comment',(data)=>{
  appendtoDom(data)
})

textarea.addEventListener('keyup',(e)=>{
  socket.emit('typing',{username})
})

let typingDiv=document.querySelector(".typing")

let timerId = null
function debounce(func,timer){
  if (timerId){
    clearTimeout(timerId)
  }
  timerId = setTimeout(()=>{
    func()
  },timer)
}

socket.on('typing',(data)=>{
  typingDiv.innerText=`${data.username} is typing...`
  debounce(function(){
    typingDiv.innerText=""
  },1000)
  
})

function syncwithDB(data){
  const headers={
    'Content-Type': 'application/json'
  }
  fetch('/api/comments',{
    method:'POST',
    body: JSON.stringify(data),
    headers
  })
  .then(res=>res.json())
  .then(res=>{
    console.log(result)
  })
}

function fetchComments(){
  fetch('/api/comments')
  .then(res=>res.json())
  .then(result=>{
    result.forEach(comment => {
      comment.time = comment.createdAt
      appendtoDom(comment)
    }); 
  })
}

window.onload= fetchComments