const BigPromise = require("../middlewares/bigPromise");
const Offer = require("../models/offer");

// Specific for Cousellor
exports.addCounsellorOffer = BigPromise(async (req, res, next) => {
  // Extracting values from body
  const {
    title,
    license,
    description,
    workingDays,
    fromTime,
    toTime,
    expertise,
    experience,
    price,
  } = req.body;

  //   If null values fouund

  if (
    !title ||
    !license ||
    !description ||
    !workingDays ||
    !fromTime ||
    !toTime ||
    !expertise ||
    !experience ||
    !price
  ) {
    return next(
      new Error(
        "Please check all required fields are being sent. Title, License, Description, Working Days, fromTime, toTime, Expertise, Experience & Price are required."
      )
    );
  }

  //   Fetching if product already present by user

  const offeredProduct = await Offer.find({ user: req.user.id });

  //   If Product Found
  if (offeredProduct.length) {
    return next(new Error("User can offer only one option at a time."));
  }

  //    Creating new Offer
  const offer = await Offer.create({
    title,
    license,
    description,
    workingDays,
    fromTime,
    toTime,
    expertise,
    experience,
    price,
    user: req.user.id,
  });

  //    Selective response
  const data = {
    title: offer.title,
    license: offer.license,
    description: offer.description,
    workingDays: offer.workingDays,
    fromTime: offer.fromTime,
    toTime: offer.toTime,
    expertise: offer.expertise,
    experience: offer.experience,
    price: offer.price,
  };
  res.status(200).json({ success: true, data });
});

// Specific for Cousellor
exports.getCounsellorOffer = BigPromise(async (req, res, next) => {
  let offer = await Offer.findOne({ user: req.user.id });
  // If No Offer Found
  if (!offer) {
    return next(new Error("No Offer Found."));
  }

  //   Sendinng Selective data
  const data = {
    title: offer.title,
    license: offer.license,
    description: offer.description,
    workingDays: offer.workingDays,
    fromTime: offer.fromTime,
    toTime: offer.toTime,
    expertise: offer.expertise,
    experience: offer.experience,
    price: offer.price,
  };
  res.status(200).json({ success: true, data });
});

// Specific for Cousellor
exports.deleteCounsellorOffer = BigPromise(async (req, res, next) => {
  const offer = await Offer.findOne({ user: req.user.id });

  //   If no data found to delete
  if (!offer) {
    return next(new Error("Nothing to delete."));
  }

  //   Deleting offer
  await offer.remove();
  res
    .status(200)
    .json({ success: true, message: "Offer Successfully Deleted." });
});

// Specific for Cousellor
exports.updateCounsellorOffer = BigPromise(async (req, res, next) => {
  // New Data to avoid updating null values
  let newData = {};
  for (let i in req.body) {
    if (req.body[i]) {
      newData[i] = req.body[i];
    }
  }
  //   If no data found to update.
  if (!Object.keys(newData).length) {
    return next(new Error("Nothing to update."));
  }

  //   Update and send selective data
  const offer = await Offer.findOneAndUpdate({ user: req.user.id }, newData, {
    new: true,
    runValidators: true,
  });
  const data = {
    title: offer.title,
    license: offer.license,
    description: offer.description,
    workingDays: offer.workingDays,
    fromTime: offer.fromTime,
    toTime: offer.toTime,
    expertise: offer.expertise,
    experience: offer.experience,
    price: offer.price,
  };
  res.status(200).json({ success: true, data });
});

// For Landing Page - Get All Offers
exports.getOffers = BigPromise(async (req, res, next) => {
  const offers = await Offer.find().populate({
    path: "user",
    select: ["name", "photo"],
  });
  res.status(200).json({ success: true, offers });
});

// Get One Offer Based on the params
exports.getOneOffer = BigPromise(async (req, res, next) => {
  const offer = await Offer.findById(req.params.id).populate({
    path: "user",
    select: ["name", "photo", "email", "qualification", "aboutme", "phno"],
  });
  if (!offer) {
    return next(new Error("No offer found."));
  }
  res.status(200).json({ success: true, offer });
});

// Temp Disable Offer
