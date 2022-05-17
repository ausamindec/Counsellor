const express = require("express");

const Router = express.Router();

const {
  addCounsellorOffer,
  getCounsellorOffer,
  deleteCounsellorOffer,
  updateCounsellorOffer,
  getOffers,
  getOneOffer,
} = require("../controllers/offer");

const { isLoggedIn, customRole } = require("../middlewares/user");

// Counsellor Specific
Router.route("/addoffer").post(
  isLoggedIn,
  customRole("Counsellor"),
  addCounsellorOffer
);

Router.route("/getcounselloroffer").get(
  isLoggedIn,
  customRole("Counsellor"),
  getCounsellorOffer
);

Router.route("/deleteoffer").delete(
  isLoggedIn,
  customRole("Counsellor"),
  deleteCounsellorOffer
);

Router.route("/updateoffer").patch(
  isLoggedIn,
  customRole("Counsellor"),
  updateCounsellorOffer
);

// View-User
Router.route("/getoffers").get(getOffers);
Router.route("/getofferdetail/:id").get(isLoggedIn, getOneOffer);

module.exports = Router;
