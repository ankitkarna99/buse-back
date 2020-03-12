const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: "User is required."
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: "Post is required."
    },
    profilePicture: {
      type: String,
      required: "Profile picture is required."
    },
    text: {
      type: String,
      trim: true,
      required: "Text is required."
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);
