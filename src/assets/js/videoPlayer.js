import getBlobDuration from "get-blob-duration";

const videoContainer = document.getElementById("jsvideoPlayer");
const videoPlayer = document.getElementById("videoBody");
const videoPlayBtn = document.getElementById("videoPlayButton");
const videoVolBtn = document.getElementById("videoVolButton");
const videoScreenBtn = document.getElementById("videoScreenBtn");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const videoPlayHover = document.querySelector(".videoplayer__playhover");
const videoVolume = document.getElementById("videoVolume");

const registerView = () => {
  const videoId = window.location.href.split("/videos/")[1];
  fetch(`/api/${videoId}/view`, {
    method: "POST"
  });
};
const handlePlayClick = () => {
  if (videoPlayer.paused) {
    videoPlayer.play();
    videoPlayHover.classList.add("show");
    setTimeout(() => {
      videoPlayHover.classList.remove("show");
    }, 500);
    videoPlayBtn.innerHTML = '<i class="fas fa-pause"></i>';
    videoPlayHover.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    videoPlayer.pause();
    videoPlayHover.classList.add("show");
    setTimeout(() => {
      videoPlayHover.classList.remove("show");
    }, 500);
    videoPlayBtn.innerHTML = '<i class="fas fa-play"></i>';
    videoPlayHover.innerHTML = '<i class="fas fa-play"></i>';
  }
};
const handleVolClick = () => {
  if (videoPlayer.muted) {
    videoVolume.value = videoPlayer.volume;
    videoPlayer.muted = false;
    videoVolBtn.innerHTML = `<i class="fas fa-volume-up"></i>`;
  } else {
    videoVolume.value = 0;
    videoPlayer.muted = true;
    videoVolBtn.innerHTML = `<i class="fas fa-volume-mute"></i>`;
  }
};
const smallScreen = () => {
  // Cross Browsing
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.mozExitFullscreen) {
    document.mozExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
  videoScreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
  videoScreenBtn.addEventListener("click", fullScreen);
};
const fullScreen = () => {
  videoContainer.classList.add("full");
  // Cross Browsing
  if (videoContainer.RequestFullscreen) {
    videoContainer.RequestFullscreen();
  } else if (videoContainer.webkitRequestFullscreen) {
    videoContainer.webkitRequestFullscreen();
  } else if (videoContainer.mozRequestFullscreen) {
    videoContainer.mozRequestFullscreen();
  } else if (videoContainer.msRequestFullscreen) {
    videoContainer.msRequestFullscreen();
  }
  videoScreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
  videoScreenBtn.addEventListener("click", smallScreen);
};

const formatDate = seconds => {
  const secondsNumber = parseInt(seconds, 10);
  let hours = Math.floor(secondsNumber / 3600);
  let minutes = Math.floor((secondsNumber - hours * 3600) / 60);
  let totalSeconds = secondsNumber - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (totalSeconds < 10) {
    totalSeconds = `0${totalSeconds}`;
  }

  return `${hours}:${minutes}:${totalSeconds}`;
};

const getCurrentTime = () => {
  const currentTimeString = formatDate(Math.floor(videoPlayer.currentTime));
  currentTime.innerText = currentTimeString;
};
const getTotalTime = async () => {
  const blob = await fetch(videoPlayer.src).then(response => response.blob());
  console.log(blob);
  console.dir(videoPlayer);
  const duration = await getBlobDuration(blob);
  const totalTimeString = formatDate(duration);
  totalTime.innerText = totalTimeString;
  setInterval(getCurrentTime, 1000);
};
const handleEnded = () => {
  videoPlayer.currentTime = 0;
  videoPlayBtn.innerHTML = '<i class="fas fa-play"></i>';
};
const handleVolume = () => {
  const volume = parseFloat(videoVolume.value, 10);
  videoPlayer.volume = volume;
  console.log(volume);
  if (volume > 0.7) {
    videoVolBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else if (volume > 0.1) {
    videoVolBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
  } else if (volume === 0) {
    videoVolBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }
};

const init = () => {
  videoPlayer.volume = 0.5;
  videoPlayer.addEventListener("click", handlePlayClick);
  videoPlayBtn.addEventListener("click", handlePlayClick);
  videoVolBtn.addEventListener("click", handleVolClick);
  videoScreenBtn.addEventListener("click", fullScreen);
  videoPlayer.addEventListener("volumechange", getTotalTime);
  videoPlayer.addEventListener("ended", handleEnded);
  videoVolume.addEventListener("input", handleVolume);
};

if (videoContainer) {
  registerView();
  init();
}
