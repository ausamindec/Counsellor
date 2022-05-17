const express = require("express");

const Router = express.Router();

const {
  confirmPayment,
  bookOffer,
  getOrders,
  addReview,
  getBookings,
  updateCounsellingStatus,
} = require("../controllers/order");

const { isLoggedIn, customRole } = require("../middlewares/user");

// Book Offer
Router.route("/getofferdetail/:id").post(isLoggedIn, bookOffer);

Router.route("/confirmpayment").post(isLoggedIn, confirmPayment);

Router.route("/myorders").get(isLoggedIn, getOrders);

Router.route("/mybookings").get(
  isLoggedIn,
  customRole("Counsellor"),
  getBookings
);

Router.route("/addreview").post(isLoggedIn, addReview);

Router.route("/updatecounsellingstatus").patch(
  isLoggedIn,
  customRole("Counsellor"),
  updateCounsellingStatus
);
module.exports = Router;
