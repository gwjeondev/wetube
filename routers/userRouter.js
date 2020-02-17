import express from "express";
import routes from "../routes";
import {
  userDetail,
  editProfile,
  changePassword
} from "../controllers/userController";
import { userPrivate } from "../middleware";

const userRouter = express.Router();

// Edit Profile
userRouter.get(routes.editProfile, userPrivate, editProfile);

// Change Password
userRouter.get(routes.changePassword, userPrivate, changePassword);

// User Detail
userRouter.get(routes.userDetail(), userDetail);

export default userRouter;
