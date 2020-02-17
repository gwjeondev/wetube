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
  postGithubLogin
} from "../controllers/userController";
import { loginPrivate } from "../middleware";

const globalRouter = express.Router();

// Home
globalRouter.get(routes.home, home);

// Join
globalRouter.get(routes.join, loginPrivate, getJoin);
globalRouter.post(routes.join, postJoin, postLogin);

// Login
globalRouter.get(routes.login, loginPrivate, getLogin);
globalRouter.post(routes.login, postLogin);

// Search
globalRouter.get(routes.search, search);

// Logout
globalRouter.get(routes.logout, logout);

// Social Login
globalRouter.get(routes.gitHub, githubLogin);
globalRouter.get(
  routes.githubCallback,
  passport.authenticate("github", { failureRedirect: "/login" }),
  postGithubLogin
);

export default globalRouter;
