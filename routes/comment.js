const router = require("express").Router();
const commentController = require("../controllers/commentController");
const auth = require("../middlewares/auth");
const { catchErrors } = require("../handlers/errorHandlers");

router.post("/:id", auth, catchErrors(commentController.newComment));
router.get("/:id", auth, catchErrors(commentController.getComments));

module.exports = router;
