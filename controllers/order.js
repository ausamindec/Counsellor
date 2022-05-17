const BigPromise = require("../middlewares/bigPromise");
const Offer = require("../models/offer");
const Order = require("../models/order");
const { initiatePayment } = require("./payment");

// To Book Session
exports.bookOffer = BigPromise(async (req, res, next) => {
  // If conselling date is empty.
  if (!req.body.counsellingDate) {
    return next(new Error("Counselling Date is Required."));
  }
  //   Getting Day from Date
  const bookingDay = new Date(req.body.counsellingDate).toLocaleString(
    "en-us",
    {
      weekday: "long",
    }
  );

  const offer = await Offer.findById(req.params.id);
  // If bookingDay is not in Working Days
  if (!offer.workingDays.includes(bookingDay)) {
    return next(
      new Error(
        "Counsellor does not work on the day. Please refer to the working days and then book the session."
      )
    );
  }
  // If user has disabled offer/session
  if (offer.tempDisable) {
    return next(
      new Error(
        "Counsellor is not accepting Bookings right now. Please check again later."
      )
    );
  }

  //   Initiate Payment
  req.body.price = offer.price;
  const payment = await initiatePayment(req, res, next);

  //   If Order Created on Razorpay
  if (!payment.success) {
    return next(new Error("Some Error Occured in Payment."));
  }

  //   Create Order in DB
  const order = await Order.create({
    user: req.user._id,
    offer: offer._id,
    paymentInfo: { orderId: payment.order.id },
    price: offer.price,
    counsellingDate: req.body.counsellingDate,
  });

  // Send Payment Info
  res.status(200).json(payment);
});

// On Payment Confirmation - Change Payment Status and add payment info in DB
exports.confirmPayment = BigPromise(async (req, res, next) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;

  const order = await Order.findOneAndUpdate(
    {
      "paymentInfo.orderId": razorpay_order_id,
    },
    {
      paymentInfo: {
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        signature: razorpay_signature,
        status: "Paid",
      },
    }
  );

  res.status(200).json({ success: true, message: "Payment Successfull." });
});

// Get All Orders Along with reviews
exports.getOrders = BigPromise(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id })
    .populate({
      path: "offer",
      select: [
        "title",
        "description",
        "fromTime",
        "toTime",
        "price",
        "ratings",
        "noOfReviews",
        "reviews",
        "user",
      ],
      populate: {
        path: "user",
        select: ["name"],
      },
    })
    .sort({ counsellingDate: "desc" });

  return res.status(200).json({ success: true, orders });
});

// Consellor Get Details of User
exports.getBookings = BigPromise(async (req, res, next) => {
  const offer = await Offer.findOne({ user: req.user._id });
  const bookings = await Order.find({ offer: offer._id }).populate({
    path: "user",
  });
  res.status(200).json({ success: true, bookings });
});

// User Add Review
exports.addReview = BigPromise(async (req, res, next) => {
  const { comment, rating, orderId } = req.body;
  if (!comment || !rating || !orderId) {
    return next(new Error("Comment, Rating & Order Id are required."));
  }

  // Add Review in order
  const order = await Order.findByIdAndUpdate(
    orderId,
    {
      review: { rating: Number(rating), comment },
    },
    { new: true }
  );

  // Add Review in offer
  const offer = await Offer.findById(order.offer);

  offer.reviews.push({
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  });
  // Change no. of reviews
  offer.noOfReviews = offer.reviews.length;

  // Adjust Ratings
  offer.ratings =
    offer.reviews.reduce((acc, item) => item.rating + acc, 0) /
    offer.reviews.length;

  await offer.save({ validateBeforeSave: false });

  res.status(200).json({ success: true });
});

// Counsellor Update Counselling Status
exports.updateCounsellingStatus = BigPromise(async (req, res, next) => {
  const { counsellingStatus, orderId } = req.body;
  if (!orderId || !counsellingStatus) {
    return next(new Error("Counselling Status and Order Id are required."));
  }
  await Order.findByIdAndUpdate(orderId, { counsellingStatus });
  res.status(200).json({ success: true, message: " Successfully Updated" });
});
