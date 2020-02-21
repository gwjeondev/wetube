const recoderContainer = document.getElementById("recordContainer");
const recordBtn = document.getElementById("recordBtn");
const recordPreview = document.getElementById("recordPreview");
const recordErrorMsg = document.getElementById("recordErrorMsg");

let streamObject;
let videoRecorder;

// recording 종료
const handleVideoData = e => {
  const { data: videoFile } = e;
  const link = document.createElement("a");
  link.href = URL.createObjectURL(videoFile);
  link.download = "recorded.webm";
  document.body.appendChild(link);
  link.click();
};

// recording 종료
const stopRecoding = () => {
  videoRecorder.stop();
  recordBtn.removeEventListener("click", stopRecoding);
  recordBtn.addEventListener("click", getVideo);
  recordBtn.innerText = "녹화 시작";
};

// recording 시작, stop 이벤트 등록
const startRecording = () => {
  videoRecorder = new MediaRecorder(streamObject);
  videoRecorder.start();
  // recording 종료시 dataavailable 이벤트 발생 handleVideoData Function 호출
  videoRecorder.addEventListener("dataavailable", handleVideoData);
  recordBtn.addEventListener("click", stopRecoding);
};

const getVideo = async () => {
  try {
    // 장치연결 device가 없을시 error 리턴
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: { width: 1280, height: 720 }
    });
    recordPreview.srcObject = stream;
    recordPreview.muted = true;
    recordPreview.play();
    recordBtn.innerText = "녹화 중지";
    streamObject = stream;
    startRecording();
  } catch (error) {
    recordErrorMsg.innerText = "⛔ 녹화할 수 없습니다. 주변 장치를 확인하세요.";
  } finally {
    recordBtn.removeEventListener("click", getVideo);
  }
};

const init = () => {
  recordBtn.addEventListener("click", getVideo);
};

if (recoderContainer) {
  init();
}
