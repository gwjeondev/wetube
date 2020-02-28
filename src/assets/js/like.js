import axios from "axios";

const likeBtn = document.getElementById("Like");
const likeShape = document.getElementById("LikeShape");
const likeNumber = document.getElementById("LikeNumber");
const likeLoginCheck = document.getElementById("LikeLoginCheck");

const addLikeNumber = () => {
  const num = parseInt(likeNumber.innerText, 10);
  likeNumber.innerText = num + 1;
  likeShape.innerHTML = '<i class="fas fa-heart"></i>';
};

const delLikeNumber = () => {
  const num = parseInt(likeNumber.innerText, 10);
  likeNumber.innerText = num - 1;
  likeShape.innerHTML = '<i class="far fa-heart"></i>';
};

const handleClick = async () => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/like`,
    method: "POST",
    data: {
      videoId
    }
  });
  if (response.data.status === true) {
    response.data.like === -1 ? addLikeNumber() : delLikeNumber();
  } else {
    likeLoginCheck.classList.add("show");
  }
};

const init = () => {
  likeBtn.addEventListener("click", handleClick);
};
if (likeBtn) {
  init();
}
