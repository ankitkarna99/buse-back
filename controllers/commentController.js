const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");
const Post = mongoose.model("Post");
const User = mongoose.model("User");
const Notification = mongoose.model("Notification");

exports.newComment = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) throw "Post is not defined!";
  const comment = new Comment({
    ...req.body,
    user: req.id,
    post: req.params.id
  });
  await comment.save();
  if (post.user.toString() !== req.id) {
    const user = await User.findById(req.id);
    const notification = new Notification({
      user: post.user,
      post: post.id,
      text: user.name + " commented on your post.",
      profilePicture: user.image
    });
    await notification.save();
  }
  res.json({
    message: "Comment added!"
  });
};

exports.getComments = async (req, res) => {
  const comments = await Comment.find({ post: req.params.id }).populate("user");
  res.json(comments);
};
