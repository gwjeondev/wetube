import routes from "./routes";

const localsMiddleware = (req, res, next) => { // 변수를 global하게 template에서 사용가능
    res.locals.siteName = "WeTube";
    res.locals.routes = routes;
    next();
}

export default localsMiddleware;