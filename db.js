import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config(); // .env에 있는 변수들을 모두 불러옴. process.env.key 와 같은 형식으로 사용가능

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

const db = mongoose.connection; // mongoDB connention 저장

const handleOpen = () => console.log("✅ Connect to MongoDB");
const handleError = error => console.log(`❌ Error on DB Connection ${error}`);

db.once("open", handleOpen);
db.on("error", handleError);
