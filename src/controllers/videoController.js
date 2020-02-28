import routes from "../routes";
import Video from "../models/Video";

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
  let like;
  try {
    const videos = await Video.findById(id)
      .populate("creator")
      .populate({
        path: "comments",
        populate: {
          path: "creator"
        }
      });
    // 로그인 유저가 좋아요를 한지 안한지 체크
    if (req.user) {
      like = req.user.likes.indexOf(videos.id);
    } else {
      like = -1;
    }
    res.render("videoDetail", { pageTitle: videos.title, videos, like });
  } catch (error) {
    req.flash("error", "존재하지 않는 비디오입니다.");
    res.status(404);
    res.redirect(routes.home);
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
