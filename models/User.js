import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

// 스키마 정의
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatarUrl: String,
  fackbookId: Number,
  githubId: Number
});

UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });

// 테이블 생성
const model = mongoose.model("User", UserSchema);

export default model;
