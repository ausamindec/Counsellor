const mongoose = require("mongoose");

const offerSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required."],
    trim: true,
    maxlength: [120, "Title Should be less than 120  chars."],
  },

  license: {
    type: String,
    required: [true, "License is required."],
  },

  description: {
    type: String,
    required: [true, "Description is required."],
  },

  workingDays: [
    { type: String, required: [true, "Working Days are required."] },
  ],

  fromTime: {
    type: String,
    required: [true, "From Time is required."],
  },

  toTime: {
    type: String,
    required: [true, "To Time is required."],
  },

  expertise: {
    type: String,
    required: [true, "Expertise is required."],
  },

  experience: {
    type: Number,
    required: [true, "Experience is required."],
  },

  price: {
    type: Number,
    required: [true, "Price is required."],
  },

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "User is required."],
  },

  ratings: {
    type: Number,
    default: 0,
  },

  noOfReviews: {
    type: Number,
    default: 0,
  },

  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "User is required."],
      },
      name: {
        type: String,
        required: [true, "Name is required."],
      },
      rating: {
        type: Number,
        required: [true, "Rating is required."],
      },
      comment: {
        type: String,
        required: [true, "Comment is required."],
      },
    },
  ],

  tempDisable: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Offer", offerSchema);
