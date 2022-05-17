const BigPromise = require("../middlewares/bigPromise");
const { v4: uuidv4 } = require("uuid");
const Razorpay = require("razorpay");

// Generate order in razorpay
exports.initiatePayment = BigPromise(async (req, res, next) => {
  //   console.log(user);

  const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET,
  });

  const myOrder = await instance.orders.create({
    amount: req.body.price * 100,
    currency: "AUD",
    receipt: uuidv4(),
  });

  req.body.order = myOrder;
  return { success: true, order: myOrder, key: process.env.RAZORPAY_KEY };
});
