const express = require("express");
const Router = express.Router();
const {
  login,
  signup,
  logout,
  getUserDetail,
  updateProfilePic,
  updateUserDetail,
} = require("../controllers/user");
const { isLoggedIn } = require("../middlewares/user");

Router.route("/signup").post(signup);
Router.route("/login").post(login);
Router.route("/logout").get(logout);
Router.route("/getuser").get(isLoggedIn, getUserDetail);
Router.route("/updateuser").patch(isLoggedIn, updateUserDetail);
Router.route("/uploadphoto").patch(isLoggedIn, updateProfilePic);

Router.route("/testdata").post(function (req, res) {
  console.log(req.body);
  console.log(req.files);
  res.status(200).json({ success: true, data: req.body });
});

module.exports = Router;
