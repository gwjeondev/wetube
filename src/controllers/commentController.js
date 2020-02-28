import Comment from "../models/Comment";
import Video from "../models/Video";
import User from "../models/User";

// add comment
export const postAddComment = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  try {
    const newComment = await Comment.create({
      text: comment,
      creator: req.user.id
    });
    const sendComment = await Comment.findById(newComment.id).populate(
      "creator"
    );
    const video = await Video.findById(id);
    const user = await User.findById(req.user.id);
    video.comments.push(newComment.id);
    user.comments.push(newComment.id);
    video.save();
    user.save();
    res.send(sendComment);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

// del comment
export const postDelComment = async (req, res) => {
  const { commentId, videoId } = req.body;
  try {
    await Comment.findByIdAndRemove({ _id: commentId });
    const video = await Video.findById(videoId);
    video.comments = video.comments.filter(comment => {
      return comment.toString() !== commentId;
    });
    req.user.comments = req.user.comments.filter(comment => {
      return comment.toString() !== commentId;
    });
    video.save();
    req.user.save();
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};
