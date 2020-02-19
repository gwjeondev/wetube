const videoContainer = document.getElementById("jsvideoPlayer");
const videoPlayer = document.getElementById("videoBody");
const videoPlayBtn = document.getElementById("videoPlayButton");
const videoVolBtn = document.getElementById("videoVolButton");

const handlePlayClick = () => {
  if (videoPlayer.paused) {
    videoPlayer.play();
    videoPlayBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    videoPlayer.pause();
    videoPlayBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
};
const handleVolClick = () => {
  if (videoPlayer.muted) {
    videoPlayer.muted = false;
    videoVolBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
} else {
    videoPlayer.muted = true;
    videoVolBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }
};
const init = () => {
  videoPlayBtn.addEventListener("click", handlePlayClick);
  videoVolBtn.addEventListener("click", handleVolClick);
};

if (videoContainer) {
  init();
}
