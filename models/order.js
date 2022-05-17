const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  offer: {
    type: mongoose.Schema.ObjectId,
    ref: "Offer",
    required: true,
  },
  paymentInfo: {
    orderId: {
      type: String,
      required: true,
    },
    paymentId: {
      type: String,
    },
    signature: {
      type: String,
    },
    status: {
      type: String,
      default: "Pending",
    },
  },
  price: {
    type: Number,
    required: true,
  },
  counsellingStatus: {
    type: String,
    default: "Pending",
  },
  review: {
    rating: {
      type: Number,
    },
    comment: {
      type: String,
    },
  },
  counsellingDate: {
    type: Date,
    required: true,
  },
  metUp: {
    isRequested: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
    },
  },
});

module.exports = mongoose.model("Order", orderSchema);
