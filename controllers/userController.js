const mongoose = require("mongoose");
const User = mongoose.model("User");
const md5 = require("md5");
const jwt = require("jwt-then");
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

exports.registerUser = async (req, res) => {
  const { email, password, name, phoneNumber } = req.body;
  const emailRegex = /@gmail.com|@yahoo.com|@hotmail.com/;

  if (!email || !password || !name || !phoneNumber)
    throw "Body not sent properly.";

  if (!emailRegex.test(email)) throw "Email from your domain is not supported.";

  if (password.length < 6) throw "Password must be six characters long.";

  if (!name.includes(" ")) throw "Enter a full name.";

  let user = await User.findOne({ email });

  if (user) throw "User with same email already exists.";

  user = new User({ email, password: md5(password), name, phoneNumber });

  await user.save();

  res.json({
    message: "Registered Sucessfully."
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) throw "Body was not sent properly.";
  let user = await User.findOne({ email: email, password: md5(password) });
  if (!user) throw "Email and password does not match";
  //json web tokens
  const token = await jwt.sign({ id: user._id }, "34568thfdcfr5gr");
  res.json({ message: "Login Successful", token });
};

exports.updateProfilePicture = async (req, res) => {
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

  await User.findByIdAndUpdate(req.id, { image: URL });

  res.json({
    message: "Profile Picture Updated!",
    url: URL
  });
};

exports.aboutMe = async (req, res) => {
  const user = await User.findById(req.id);

  res.json(user);
};
