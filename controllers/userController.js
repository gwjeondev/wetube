export const join = (req, res) => res.render("join", {pageTtile: "Join"});
export const login = (req, res) => res.render("login", {pageTtile: "Login"});
export const logout = (req, res) => res.render("logout", {pageTtile: "Logout"});
export const users = (req, res) => res.render("users", {pageTtile: "Users"});
export const userDetail = (req, res) => res.render("userDetail", {pageTtile: "User-Detail"});
export const editProfile = (req, res) => res.render("editProfile", {pageTtile: "Edit-Profile"});
export const changePassword = (req, res) => res.render("changePassword", {pageTtile: "Change-Password"});




