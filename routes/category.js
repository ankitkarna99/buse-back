const router = require("express").Router();
const categoryController = require("../controllers/categoryController");
const auth = require("../middlewares/auth");
const { catchErrors } = require("../handlers/errorHandlers");

router.get("/", auth, catchErrors(categoryController.getCategories));

module.exports = router;
