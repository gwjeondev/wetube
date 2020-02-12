import multer from "multer";
import routes from "./routes";


export const uploadVideo = multer({dest: "uploads/videos/"}).single("video-file");

export const localsMiddleware = (req, res, next) => { // 변수를 global하게 template에서 사용가능
    res.locals.siteName = "WeTube";
    res.locals.routes = routes;
    res.locals.user = {
        isauthenticated: true,
        id:1
    }
    next();
}
