const mongoose = require("mongoose");
const User = mongoose.model("User");
const md5 = require("md5");
const jwt = require("jwt-then");

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

exports.aboutMe = async (req, res) => {
  const user = await User.findById(req.id);

  res.json(user);
};
