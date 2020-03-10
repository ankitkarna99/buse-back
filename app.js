const express = require("express");
const errorHandlers = require("./handlers/errorHandlers");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));

app.use(require("cors")());

//File Upload Enable
app.use(require("express-fileupload")());

app.use("/user", require("./routes/user"));
app.use("/category", require("./routes/category"));
app.use("/notification", require("./routes/notification"));
app.use("/post", require("./routes/post"));
app.use("/comment", require("./routes/comment"));
app.use("/search", require("./routes/search"));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello" });
});

app.use(errorHandlers.mongoseErrors);
app.use(errorHandlers.developmentErrors);

module.exports = app;
