import routes from "../routes";

export const getJoin = (req, res) => res.render("join", {pageTitle: "Join"});

export const postJoin = (req, res) => {
    const { password, password2 } = req.body;
    console.log(req.body);
    if(password !== password2) {
        res.status(400); // 요청에 대한 상태코드
        res.render("join", {pageTitle: "Join"});
    } else { // 사용자 등록 완료
        res.redirect(routes.home); // 요청의 경로를 재지정  ??전 의 요청으로 재지정한다??
    }
};

export const getLogin = (req, res) => res.render("login", {pageTitle: "Login"});

export const postLogin = (req, res) => {
    res.redirect(routes.home);
};

export const logout = (req, res) => {
    // 로그아웃
    res.redirect(routes.home);
}

// export const users = (req, res) => res.render("users", {pageTitle: "Users"});
export const userDetail = (req, res) => res.render("userDetail", {pageTitle: "User-Detail"});
export const editProfile = (req, res) => res.render("editProfile", {pageTitle: "Edit-Profile"});
export const changePassword = (req, res) => res.render("changePassword", {pageTitle: "Change-Password"});




