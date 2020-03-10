const mongoose = require("mongoose");
const Category = mongoose.model("Category");

exports.getCategories = async (req, res) => {
  const categories = await Category.find({});
  res.json(categories);
};
