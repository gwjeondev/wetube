import routes from "../routes";
import Video from "../models/Video";

// Home
export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ _id: -1 });
    console.log(videos);
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
  const { path } = req.file;
  const newVideo = await Video.create({
    fileUrl: path,
    title: Title,
    description
  });
  res.redirect(routes.videoDetail(newVideo.id));
};

// Video Detail
export const videoDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const videos = await Video.findById(id);
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
    res.render("editVideo", {
      pageTitle: `Edit - ${videos.title}`,
      videos
    });
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
  try {
    await Video.findOneAndRemove({ _id: id });
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};
