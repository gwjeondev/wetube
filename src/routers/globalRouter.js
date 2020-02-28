import express from "express";
import passport from "passport";
import routes from "../routes";
import { home, search } from "../controllers/videoController";
import {
  logout,
  getJoin,
  postJoin,
  getLogin,
  postLogin,
  githubLogin,
  postGithubLogin,
  getMe,
  kakaoLogin,
  postKakaoLogin,
  naverLogin,
  postNaverLogin
} from "../controllers/userController";
import { loginPrivate } from "../middleware";

const globalRouter = express.Router();

// Home
globalRouter.get(routes.home, home);

// Join
globalRouter.get(routes.join, loginPrivate, getJoin);
globalRouter.post(routes.join, loginPrivate, postJoin, postLogin);

// Login
globalRouter.get(routes.login, loginPrivate, getLogin);
globalRouter.post(routes.login, loginPrivate, postLogin);

// Search
globalRouter.get(routes.search, search);

// Logout
globalRouter.get(routes.logout, logout);

// Social Login
globalRouter.get(routes.gitHub, githubLogin);
globalRouter.get(
  routes.githubCallback,
  passport.authenticate("github", {
    failureRedirect: "/login",
    successFlash: "로그인 성공!",
    failureFlash: "아이디 또는 비밀번호를 확인하세요!"
  }),
  postGithubLogin
);

globalRouter.get(routes.kakao, kakaoLogin);
globalRouter.get(
  routes.kakaoCallback,
  passport.authenticate("kakao", {
    failureRedirect: "/login",
    successFlash: "로그인 성공!",
    failureFlash: "아이디 또는 비밀번호를 확인하세요!"
  }),
  postKakaoLogin
);

globalRouter.get(routes.naver, naverLogin);
globalRouter.get(
  routes.naverCallback,
  passport.authenticate("naver", {
    failureRedirect: "/login",
    successFlash: "로그인 성공!",
    failureFlash: "아이디 또는 비밀번호를 확인하세요!"
  }),
  postNaverLogin
);

globalRouter.get(routes.me, getMe);

export default globalRouter;
