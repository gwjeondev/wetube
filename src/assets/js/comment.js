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
  const li = e.target.parentNode;
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
  const spantext = document.createElement("span");
  const spandel = document.createElement("span");
  const spandate = document.createElement("span");
  spantext.innerText = comment;
  spandel.innerText = "❎";
  spandel.className = "del-comment";
  spandel.id = response.data._id;
  spandel.addEventListener("click", delSendComment);
  spandate.innerText = new Date().toString().slice(0, 21);
  li.appendChild(spantext);
  li.appendChild(spandel);
  li.appendChild(spandate);
  commentList.prepend(li);
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
