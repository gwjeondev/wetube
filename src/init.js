import dotenv from "dotenv";
import "@babel/polyfill";
import app from "./app";
import "./db";
import "./models/Video";
import "./models/User";
import "./models/Comment";

dotenv.config(); // .env에 있는 변수들을 모두 불러옴. process.env.key 와 같은 형식으로 사용가능

const GETPORT = () => {
  if (process.env.NODE_ENV === "production") {
    return process.env.AWS_PORT;
  }
  return process.env.LOCAL_PORT;
};

const PORT = GETPORT();
const handleListening = () => {
  console.log(`✅Listening on: http://localhost:${PORT}`);
};

app.listen(PORT, handleListening);
