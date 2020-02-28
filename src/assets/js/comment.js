import axios from "axios";

const addCommentForm = document.getElementById("addComment");
const commentInput = document.getElementById("commentInput");
const commentList = document.getElementById("commentList");
const commentNumber = document.getElementById("commentNumber");
const delCommentBtn = document.querySelectorAll(".comment__del-btn");
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
  const li = e.target.parentNode.parentNode.parentNode;
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
  const avatar = document.createElement("img");
  const content = document.createElement("div");
  const info = document.createElement("div");
  const creator = document.createElement("div");
  const author = document.createElement("span");
  const time = document.createElement("span");
  const del = document.createElement("span");
  const text = document.createElement("span");
  li.className = "comment__list";
  avatar.className = "comment__avatar";
  content.className = "comment__content";
  info.className = "comment__info";
  creator.className = "comment__creator";
  author.className = "comment__author";
  time.className = "comment__time";
  del.className = "comment__del-btn";
  avatar.src = response.data.creator.avatarUrl;
  author.innerText = response.data.creator.name;
  time.innerText = new Date().toString().slice(0, 21);
  del.id = response.data._id;
  del.innerText = "❎";
  text.innerText = comment;
  creator.appendChild(author);
  creator.appendChild(time);
  info.appendChild(creator);
  info.appendChild(del);
  content.appendChild(info);
  content.appendChild(text);
  li.appendChild(avatar);
  li.appendChild(content);
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
