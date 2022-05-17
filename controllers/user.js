const cookietoken = require("../utils/cookietoken");
const BigPromise = require("../middlewares/bigPromise");
const User = require("../models/user");
const cloudinary = require("cloudinary").v2;

exports.signup = BigPromise(async (req, res, next) => {
  const { email, name, password, dob, qualification, aboutme, phno, role } =
    req.body;

  // If Details are missing

  if (
    !email ||
    !name ||
    !password ||
    !dob ||
    !qualification ||
    !aboutme ||
    !phno ||
    !role ||
    !req.files
  ) {
    return next(
      new Error(
        "Required Details are missing. Make sure you have selected profile pic too."
      )
    );
  }

  const existingUser = await User.find({ email });

  if (existingUser.length) {
    return next(new Error("Email already exists."));
  }

  //  Extracting Photo detail

  let file = req.files.photo;

  // Updloading to cloudinary

  const picUploadResult = await cloudinary.uploader.upload(file.tempFilePath, {
    folder: "counsellorUsers",
  });

  // Creating User

  const user = await User.create({
    name,
    email,
    password,
    dob,
    qualification,
    aboutme,
    phno,
    role,
    photo: {
      id: picUploadResult.public_id,
      secure_url: picUploadResult.secure_url,
    },
  });

  // On Successful Signup

  cookietoken(user, res);
});

exports.login = BigPromise(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new Error("Email & Password are required."));
  }

  // Check User in DB

  const user = await User.findOne({ email }).select("+password");

  // If user not found

  if (!user) {
    return next(new Error("User Not Registered. Please check Email Id."));
  }

  // If user Found - Compare passwords

  const isValidPassword = await user.isPasswordValid(password);

  // If passoword does not match

  if (!isValidPassword) {
    return next(new Error("Password is incorrect."));
  }

  // If Password is valid

  cookietoken(user, res);
});

exports.logout = BigPromise(async (req, res, next) => {
  // Deleting the cookies
  res.cookie(process.env.COOKIE_TOKEN_NAME, null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({ success: true, message: "Successfully Logged out" });
});

exports.getUserDetail = BigPromise(async (req, res, next) => {
  // Fetching User
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});

exports.updateProfilePic = BigPromise(async (req, res, next) => {
  // If req.files not found
  if (!req.files) {
    return next(new Error("No Pic Found."));
  }

  // Extracting file
  let file = req.files.photo;

  //  Extracting photo id from injected user
  const photo_id = req.user.photo.id;

  // Deleting Previous Stored Photo
  await cloudinary.uploader.destroy(photo_id);

  // Uploading new photo
  const picUploadResult = await cloudinary.uploader.upload(file.tempFilePath, {
    folder: "counsellorUsers",
  });

  // New photo object
  const photo = {
    id: picUploadResult.public_id,
    secure_url: picUploadResult.secure_url,
  };

  // Find User and update photo object
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { photo },
    { new: true }
  );

  // Success Response
  res.status(200).json({ success: true, photo: user.photo });
});

exports.updateUserDetail = BigPromise(async (req, res, next) => {
  // Initializing newData to avoid updating value to null
  let newData = {};
  for (let i in req.body) {
    if (req.body[i]) {
      newData[i] = req.body[i];
    }
  }

  // If only null values found

  if (!Object.keys(newData).length) {
    return next(new Error("Nothing to update."));
  }

  // Updating user values

  const user = await User.findByIdAndUpdate(req.user.id, newData, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, user });
});

// Change Password

// Forgot Password
