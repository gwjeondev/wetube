import dotenv from "dotenv";
import passport from "passport";
import GithubStrategy from "passport-github";
import KakaoStrategy from "passport-kakao";
import NaverStrategy from "passport-naver";
import User from "./models/User";
import {
  githubLoginCallback,
  kakaoLoginCallback,
  naverLoginCallback
} from "./controllers/userController";
import routes from "./routes";

dotenv.config();

// Local
passport.use(User.createStrategy());

const getCallBackURL = () => {
  if (process.env.NODE_ENV === "production") {
    return "https://www.won-wetube.com";
  }
  return "http://localhost:4000";
};

const callBackURL = getCallBackURL();

// Github
passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: `${callBackURL}${routes.githubCallback}`
    },
    githubLoginCallback
  )
);

// Kakao
passport.use(
  new KakaoStrategy(
    {
      clientID: process.env.KAKAO_ID,
      callbackURL: `${callBackURL}${routes.kakaoCallback}`
    },
    kakaoLoginCallback
  )
);

// Facebook
passport.use(
  new NaverStrategy(
    {
      clientID: process.env.NAVER_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
      callbackURL: `${callBackURL}${routes.naverCallback}`
    },
    naverLoginCallback
  )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
