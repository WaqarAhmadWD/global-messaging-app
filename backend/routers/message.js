const express = require("express");
const router = express.Router();
const controller = require("../controllers/message.js");
const middleware = require("../middlewares/middlewares.js");
const { body } = require("express-validator");

// send one message
router.post(
  "/send/:id",
  middleware.tokenValidator,
  [body("message").notEmpty().withMessage("Message must not be empty")],
  controller.sendMessage
);
// get all messages from one user
router.get("/get/:id", middleware.tokenValidator, controller.getMessage);

// send one message
router.post(
  "/send",
  middleware.tokenValidator,
  [body("message").notEmpty().withMessage("Message must not be empty")],
  controller.sendMessageClub
);
// get all messages from one user
router.get("/get", middleware.tokenValidator, controller.getMessageClub);

module.exports = router;
