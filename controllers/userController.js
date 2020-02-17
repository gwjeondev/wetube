import passport from "passport";
import routes from "../routes";
import User from "../models/User";

// Join
export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });
export const postJoin = async (req, res, next) => {
  const { name, email, password, password2 } = req.body;
  if (password !== password2) {
    res.status(400); // 요청에 대한 상태코드
    res.render("join", { pageTitle: "Join" });
  } else {
    // 사용자 등록 완료
    try {
      const user = await User({
        name,
        email
      });
      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.home); // 요청의 경로를 재지정  ??전 의 요청으로 재지정한다??
    }
  }
};

// Login
export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Login" });
export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home
});

// Social Login
export const githubLogin = passport.authenticate("github");
export const githubLoginCallback = async (
  accessToken,
  refreshToken,
  profile,
  cb
) => {
  const { id, avatar_url, name, email } = profile._json;
  try {
    console.log(profile._json);
    const user = await User.findOne({ email });
    console.log(email);
    if (user) {
      user.githubId = id;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      githubId: id,
      avatarUrl: avatar_url
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};
export const postGithubLogin = (req, res) => {
  res.redirect(routes.home);
};

// Logout
export const logout = (req, res) => {
  req.logout(); // passport 사용시
  res.redirect(routes.home);
};

// User Detail
export const userDetail = (req, res) =>
  res.render("userDetail", { pageTitle: "User-Detail" });

// Edit Profile
export const editProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "Edit-Profile" });

// Change Password
export const changePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Change-Password" });
