import dotenv from "dotenv";
import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import routes from "./routes";

dotenv.config();

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_PRIVATE_KEY
});

// File upLoad 미들웨어
export const uploadVideo = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "won-wetube/video"
  })
}).single("video-file");

export const uploadAvatar = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "won-wetube/avatar"
  })
}).single("avatar");

// 로컬 템플릿 미들 웨어
export const localsMiddleware = (req, res, next) => {
  // 변수를 global하게 template에서 사용가능
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null;
  next();
};

// Router 권한 제어 미들웨어
export const loginPrivate = (req, res, next) =>
  req.user ? res.redirect(routes.home) : next();
export const userPrivate = (req, res, next) =>
  req.user ? next() : res.redirect(routes.home);
