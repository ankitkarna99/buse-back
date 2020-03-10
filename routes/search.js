const router = require("express").Router();
const postController = require("../controllers/postController");
const auth = require("../middlewares/auth");
const { catchErrors } = require("../handlers/errorHandlers");

router.get("/:query", auth, catchErrors(postController.search));

module.exports = router;
