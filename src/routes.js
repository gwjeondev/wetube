// Global
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";

// Users
const USERS = "/users";
const ME = "/me";
const USER_DETAIL = "/:id";
const EDIT_PROFILE = "/edit-profile";
const CHANGE_PASSWORD = "/change-password";

// Vidoes
const VIDEOS = "/videos";
const UPLOAD = "/upload";
const VIDEO_DETAIL = "/:id";
const EDIT_VIDEO = "/:id/edit";
const DELETE_VIDEO = "/:id/delete";

// Social Login
const GITHUB = "/auth/github";
const GITHUB_CALLBACK = "/auth/github/callback";
const KAKAO = "/auth/kakao";
const KAKAO_CALLBACK = "/oauth";
const NAVER = "/auth/naver";
const NAVER_CALLBACK = "/auth/naver/callback";

// Ajax
const API = "/api";
const REGISTER_VIEW = "/:id/view";
const ADD_COMMENT = "/:id/comment";
const DEL_COMMENT = "/:id/comment-delete";
const LIKE = "/:id/like";

const routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  search: SEARCH,
  users: USERS,
  me: ME,
  userDetail: id => (id ? `${USERS}/${id}` : USER_DETAIL),
  editProfile: EDIT_PROFILE,
  changePassword: CHANGE_PASSWORD,
  videos: VIDEOS,
  upload: UPLOAD,
  videoDetail: id => (id ? `${VIDEOS}/${id}` : VIDEO_DETAIL),
  editVideo: id => (id ? `/videos/${id}/edit` : EDIT_VIDEO),
  deleteVideo: id => (id ? `/videos/${id}/delete` : DELETE_VIDEO),
  gitHub: GITHUB,
  githubCallback: GITHUB_CALLBACK,
  kakao: KAKAO,
  kakaoCallback: KAKAO_CALLBACK,
  naver: NAVER,
  naverCallback: NAVER_CALLBACK,
  api: API,
  registerView: REGISTER_VIEW,
  addComment: ADD_COMMENT,
  delComment: DEL_COMMENT,
  like: LIKE
};

export default routes;
