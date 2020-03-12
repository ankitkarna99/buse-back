const router = require("express").Router();
const userController = require("../controllers/userController");
const { catchErrors } = require("../handlers/errorHandlers");
const auth = require("../middlewares/auth");

router.post("/register", catchErrors(userController.registerUser));
router.post("/login", catchErrors(userController.login));
router.get("/aboutMe", auth, catchErrors(userController.aboutMe));
router.post(
  "/updateProfilePicture",
  auth,
  catchErrors(userController.updateProfilePicture)
);

module.exports = router;
