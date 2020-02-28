import express from "express";
import routes from "../routes";
import {
  postAddComment,
  postDelComment
} from "../controllers/commentController";
import { postRegisterView } from "../controllers/videoController";
import postVideoLike from "../controllers/likeController";

const apiRouter = express.Router();

apiRouter.post(routes.registerView, postRegisterView);
apiRouter.post(routes.addComment, postAddComment);
apiRouter.post(routes.delComment, postDelComment);
apiRouter.post(routes.like, postVideoLike);

export default apiRouter;
