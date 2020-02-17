import multer from "multer";
import routes from "./routes";

export const uploadVideo = multer({ dest: "uploads/videos/" }).single(
  "video-file"
);

export const localsMiddleware = (req, res, next) => {
  // 변수를 global하게 template에서 사용가능
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  res.locals.user = req.user || null;
  next();
};

export const loginPrivate = (req, res, next) =>
  req.user ? res.redirect(routes.home) : next();

export const userPrivate = (req, res, next) =>
  req.user ? next() : res.redirect(routes.home);
