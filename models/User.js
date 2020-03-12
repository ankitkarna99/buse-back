const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      required: "Email is required."
    },
    password: {
      type: String,
      trim: true,
      required: "Password is required."
    },
    name: {
      type: String,
      trim: true,
      required: "Name is required."
    },
    phoneNumber: {
      type: String,
      trim: true,
      required: "Phone number is required."
    },
    image: {
      type: String,
      trim: true,
      default: "/images/avatar2.png"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
