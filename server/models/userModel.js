const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "Fullname is a required field."],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is a required field."],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email."],
    },
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
    password: {
      type: String,
      minlength: [8, "Password must have atleast 8 characters."],
      select: false,
    },
    phone: {
      type: String,
      required: [true, "Phone is a required field."],
      validate: {
        validator: function (value) {
          return /^[0-9]{10}$/.test(value);
        },
        message: "Phone number must contain exactly 10 digits (0–9 only).",
      },
    },
    address: {
      type: String,
      required: [true, "Address is a required field."],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
