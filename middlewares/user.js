const BigPromise = require("./bigPromise");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Check User is Logged in or not and inject it in request if logged in
exports.isLoggedIn = BigPromise(async (req, res, next) => {
  const token = req.cookies[process.env.COOKIE_TOKEN_NAME];

  if (!token) {
    return next(new Error("Please Login First to access this page."));
  }

  const decode = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decode.id);
  next();
});

// Check the role of user and respond accordingly
exports.customRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new Error("Access Denied. You are not authorize to access this route.")
      );
    }
    next();
  };
};
