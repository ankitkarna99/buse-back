const router = require("express").Router();
const postController = require("../controllers/postController");
const auth = require("../middlewares/auth");
const { catchErrors } = require("../handlers/errorHandlers");

router.post("/", auth, catchErrors(postController.createPost));
router.get("/", auth, catchErrors(postController.getPosts));
router.get("/mine", auth, catchErrors(postController.getMinePost));
router.get("/:id", auth, catchErrors(postController.postById));
router.get(
  "/category/:id",
  auth,
  catchErrors(postController.postsByCategoryId)
);

module.exports = router;
