const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is Required."],
      maxlength: [40, "Name should be less than 40 chars."],
    },
    email: {
      type: String,
      required: [true, "Email is Required."],
      validate: [validator.isEmail, "Invalid Email."],
      unique: [true, "Email already exists."],
    },
    password: {
      type: String,
      required: [true, "Password is Required."],
      minlength: [8, "Password should have minimum 8 chars."],
      select: false,
    },
    dob: {
      type: Date,
      required: [true, "Date of Birth is Required."],
    },
    qualification: {
      type: String,
      required: [true, "Qualification is Required"],
    },
    aboutme: {
      type: String,
      required: [true, "Tell us About yourself."],
    },
    phno: {
      type: String,
      required: [true, "Phone Number is Required."],
    },
    role: {
      type: String,
      required: [true, "Role of User is Required."],
    },
    photo: {
      id: {
        type: String,
      },
      secure_url: {
        type: String,
      },
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
  },
  { timestamps: true }
);

// Hook used to encrypt password when password is modified before saving to DB

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// Methods

// Validate Password

userSchema.methods.isPasswordValid = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// JWT Token

userSchema.methods.getJwtToken = function () {
  return jwt.sign(
    {
      id: this._id,
      name: this.name,
      email: this.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRY }
  );
};

// Forgot Password

userSchema.forgotPassword = function () {
  // String Token
  const token = crypto.randomBytes(20).toString("hex");

  this.forgotPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  // Validity is 1 hour

  this.forgotPasswordExpiry = Date.now() + 60 * 60 * 1000;

  return token;
};

module.exports = mongoose.model("User", userSchema);
