import mongoose from "mongoose";

// 스키마정의
const CommentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: "Text is required"
  },
  createAt: {
    type: Date,
    default: Date.now
  }
});

// 테이블 정의
const model = mongoose.model("Comment", CommentSchema);

export default model;
