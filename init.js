import app from "./app";
import "./db";
import dotenv from "dotenv";
dotenv.config(); // .env에 있는 변수들을 모두 불러옴. process.env.key 와 같은 형식으로 사용가능

const PORT = process.env.PORT;

const handleListening = () => {
    console.log(`✅Listening on: http://localhost:${PORT}`);
}

app.listen(PORT, handleListening);
