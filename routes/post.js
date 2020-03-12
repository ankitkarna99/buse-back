const router = require("express").Router();
const postController = require("../controllers/postController");
const auth = require("../middlewares/auth");
const { catchErrors } = require("../handlers/errorHandlers");

router.post("/", auth, catchErrors(postController.createPost));
router.get("/", auth, catchErrors(postController.getPosts));
router.get("/mine", auth, catchErrors(postController.getMinePost));
router.get("/delete/:id", auth, catchErrors(postController.deletePost));
router.get(
  "/category/:id",
  auth,
  catchErrors(postController.postsByCategoryId)
);
router.get("/:id", auth, catchErrors(postController.postById));

module.exports = router;
