import Video from "../models/Video";

const postVideoLike = async (req, res) => {
  const { videoId } = req.body;
  try {
    const like = req.user.likes.indexOf(videoId);
    const video = await Video.findById(videoId);
    if (like === -1) {
      // 좋아요가 없을때
      video.likes += 1;
      video.save();
      req.user.likes = videoId;
      req.user.save();
    } else {
      // 좋아요가 있을때
      video.likes -= 1;
      video.save();
      req.user.likes = req.user.likes.filter(i => i.toString() !== videoId);
      req.user.save();
    }
    res.send(like.toString());
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

export default postVideoLike;
