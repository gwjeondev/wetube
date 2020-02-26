import axios from "axios";

const addCommentForm = document.getElementById("addComment");
const commentInput = document.getElementById("commentInput");
const commentList = document.getElementById("commentList");
const commentNumber = document.getElementById("commentNumber");
const delCommentBtn = document.querySelectorAll(".del-comment");

// Delete Comment

// comment Count
const delCommentNumber = () => {
  commentNumber.innerText = parseInt(commentNumber.innerText, 10) - 1;
};

// front-end Del Comment
const delComment = li => {
  commentList.removeChild(li);
  delCommentNumber();
};

// Ajax
const delSendComment = async e => {
  const videoId = window.location.href.split("/videos/")[1];
  const commentId = e.target.id;
  const li = e.target.parentNode.parentNode;
  const response = await axios({
    url: `/api/${videoId}/comment-delete`,
    method: "POST",
    data: {
      commentId,
      videoId
    }
  });
  if (response.status === 200) {
    delComment(li);
  }
};

// Add Comment

// comment Count
const addCommentNumber = () => {
  commentNumber.innerText = parseInt(commentNumber.innerText, 10) + 1;
};

// front-end Add Comment
const addComment = (comment, response) => {
  const li = document.createElement("li");
  const infodiv = document.createElement("div");
  const titlediv = document.createElement("div");
  const name = document.createElement("span");
  const date = document.createElement("span");
  const del = document.createElement("span");
  const text = document.createElement("span");
  infodiv.className = "video__comment-info";
  titlediv.className = "video__comment-title";
  name.innerText = response.data.creator.name;
  name.className = "author";
  date.innerText = new Date().toString().slice(0, 21);
  date.className = "time";
  text.innerText = comment;
  del.innerText = "❎";
  del.className = "del-comment";
  del.id = response.data._id;
  titlediv.appendChild(name);
  titlediv.appendChild(date);
  infodiv.appendChild(titlediv);
  infodiv.appendChild(del);
  li.appendChild(infodiv);
  li.appendChild(text);
  commentList.prepend(li);
  del.addEventListener("click", delSendComment);
  addCommentNumber();
};

// Ajax
const addSendComment = async comment => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/comment`,
    method: "POST",
    data: {
      comment
    }
  });
  console.log(response);
  if (response.status === 200) {
    addComment(comment, response);
  }
};

// Add Comment handler
const handleSubmit = e => {
  e.preventDefault();
  const comment = commentInput.value;
  addSendComment(comment);
  commentInput.value = "";
};

const init = () => {
  addCommentForm.addEventListener("submit", handleSubmit);
  delCommentBtn.forEach(btn => {
    btn.addEventListener("click", delSendComment);
  });
};

if (addCommentForm) {
  init();
}
