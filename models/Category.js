const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: "Name is required."
  },
  image: {
    type: String,
    required: "Image is required."
  }
});

module.exports = mongoose.model("Category", categorySchema);
