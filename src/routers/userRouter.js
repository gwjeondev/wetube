import express from "express";
import routes from "../routes";
import {
  userDetail,
  getEditProfile,
  postEditProfile,
  getChangePassword,
  postChangePassword
} from "../controllers/userController";
import { userPrivate, uploadAvatar } from "../middleware";

const userRouter = express.Router();

// Edit Profile
userRouter.get(routes.editProfile, userPrivate, getEditProfile);
userRouter.post(routes.editProfile, userPrivate, uploadAvatar, postEditProfile);

// Change Password
userRouter.get(routes.changePassword, userPrivate, getChangePassword);
userRouter.post(routes.changePassword, userPrivate, postChangePassword);

// User Detail
userRouter.get(routes.userDetail(), userDetail);

export default userRouter;
