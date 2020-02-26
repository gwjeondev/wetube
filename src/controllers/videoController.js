import routes from "../routes";
import Comment from "../models/Comment";
import Video from "../models/Video";
import User from "../models/User";

// Home
export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ _id: -1 });
    res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    res.render("home", { pageTitle: "Home", videos: [] });
    console.log(error);
  }
};

// Search
export const search = async (req, res) => {
  const { term: searchingBy } = req.query;
  let videos = [];
  try {
    videos = await Video.find({
      title: { $regex: searchingBy, $options: "i" }
    }); // 정규 표현식
  } catch (error) {
    console.log(error);
  }
  res.render("search", { pageTitle: "Search", searchingBy, videos });
};

// UpLoad
export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });
export const postUpload = async (req, res) => {
  const { Title, description } = req.body;
  const { location } = req.file;
  const newVideo = await Video.create({
    fileUrl: location,
    title: Title,
    description,
    creator: req.user.id
  });
  req.user.videos.push(newVideo.id);
  req.user.save();
  res.redirect(routes.videoDetail(newVideo.id));
};

// Video Detail
export const videoDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const videos = await Video.findById(id)
      .populate("creator")
      .populate({
        path: "comments",
        populate: {
          path: "creator"
        }
      });
    res.render("videoDetail", { pageTitle: videos.title, videos });
  } catch (error) {
    res.render(routes.home);
  }
};

// Edit Video
export const getEditVideo = async (req, res) => {
  const { id } = req.params;
  try {
    const videos = await Video.findById(id);
    if (videos.creator.toString() !== req.user.id) {
      throw Error();
    } else {
      res.render("editVideo", {
        pageTitle: `Edit - ${videos.title}`,
        videos
      });
    }
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  // 컬럼 UPDATE
  try {
    await Video.findByIdAndUpdate({ _id: id }, { title, description });
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
};

// Delete Video
export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  // 컬럼 DELETE
  const videos = await Video.findById(id);
  try {
    if (videos.creator.toString() !== req.user.id) {
      throw Error();
    } else {
      await Video.findOneAndRemove({ _id: id });
      const removeVideo = await req.user.videos.filter(vid => {
        return vid.toString() !== id;
      });
      req.user.videos = removeVideo;
      req.user.save();
      res.redirect(routes.home);
    }
  } catch (error) {
    res.redirect(routes.home);
  }
};

// register Video View
export const postRegisterView = async (req, res) => {
  const { id } = req.params;
  try {
    const video = await Video.findById(id);
    video.views += 1;
    video.save();
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

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
    res.send(JSON.stringify(sendComment));
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
