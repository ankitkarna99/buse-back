const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: "Title is required.",
      text: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: "User is required."
    },
    address: {
      type: String,
      trim: true,
      required: "Address is required."
    },
    price: {
      type: String,
      trim: true,
      required: "Price is required."
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: "Category is required"
    },
    image: {
      type: String,
      required: "Image is required."
    },
    condition: {
      type: String,
      trim: true,
      enum: ["Brand New", "Like New", "Used", "Antique", "Excellent", "Old"],
      required: "Phone number is required."
    },
    description: {
      type: String,
      trim: true,
      required: "Description is required."
    },
    expiresIn: {
      type: Date,
      default: Date.now() + 86400000 * 30
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
