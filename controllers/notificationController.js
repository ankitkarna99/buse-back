const mongoose = require("mongoose");
const Notification = mongoose.model("Notification");

exports.getNotifications = async (req, res) => {
  const notifications = await Notification.find({ user: req.id })
    .sort({ $natural: -1 })
    .populate("user")
    .populate("post")
    .limit(25);

  res.json(notifications);
};
