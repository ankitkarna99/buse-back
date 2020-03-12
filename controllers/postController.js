const mongoose = require("mongoose");
const Post = mongoose.model("Post");
const path = require("path");

const moveFile = (file, dir) => {
  return new Promise((resolve, reject) => {
    file.mv(dir, function(err) {
      if (err) {
        reject("Couldn't move file.");
      } else {
        resolve();
      }
    });
  });
};

exports.createPost = async (req, res) => {
  if (!req.files) throw "File wasn't supplied.";

  var file = req.files.file;
  var fileName = file.name;
  var size = file.data.length;
  var extension = path.extname(fileName);
  var allowedExtensions = /png|jpg|gif|jpeg/;

  var md5 = file.md5;
  let URL;

  var validExtension = allowedExtensions.test(extension.toLowerCase());

  if (!validExtension) throw "Only image file is allowed!";

  if (size > 5000000) throw "File size must be less than 5 MB";

  URL = "/uploads/" + md5 + extension;
  await moveFile(file, "./public" + URL);

  const post = new Post({ ...req.body, user: req.id, image: URL });
  await post.save();

  res.json({
    message: "Post created!"
  });
};

exports.postById = async (req, res) => {
  const post = await Post.findById(req.params.id).populate("user");

  if (!post) throw "Post not found.";
  res.json({ ...post._doc, canDelete: post.user.id.toString() === req.id });
};

exports.postsByCategoryId = async (req, res) => {
  const posts = await Post.find({ category: req.params.id }).limit(30);

  res.json(posts);
};

exports.getPosts = async (req, res) => {
  const posts = await Post.find({}).limit(30);

  res.json(posts);
};

exports.deletePost = async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.json({
    message: "Post deleted!"
  });
};

exports.getMinePost = async (req, res) => {
  const posts = await Post.find({ user: req.id }).limit(30);

  res.json(posts);
};

exports.search = async (req, res) => {
  const posts = await Post.find(
    { $text: { $search: req.params.query } },
    { score: { $meta: "textScore" } }
  ).limit(30);

  res.json(posts);
};
