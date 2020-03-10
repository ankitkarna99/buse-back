const router = require("express").Router();
const notificationController = require("../controllers/notificationController");
const auth = require("../middlewares/auth");
const { catchErrors } = require("../handlers/errorHandlers");

router.get("/", auth, catchErrors(notificationController.getNotifications));

module.exports = router;
