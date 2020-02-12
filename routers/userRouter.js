import express from "express";
import routes from "../routes";
import { users, userDetail, editProfile, changePassword } from "../controllers/userController";

const userRouter = express.Router();

// Edit Profile
userRouter.get(routes.editProfile, editProfile);

// Change Password
userRouter.get(routes.changePassword, changePassword);

// User Detail
userRouter.get(routes.userDetail(), userDetail);

export default userRouter;