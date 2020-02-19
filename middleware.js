import multer from "multer";
import routes from "./routes";

// File upLoad 미들웨어
export const uploadVideo = multer({ dest: "uploads/videos/" }).single(
  "video-file"
);
export const uploadAvatar = multer({ dest: "uploads/avatars/" }).single(
  "avatar"
);

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
