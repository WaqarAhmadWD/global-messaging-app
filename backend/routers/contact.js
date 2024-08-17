const express = require("express");
const router = express.Router();
const controller = require("../controllers/contact.js");
const { body } = require("express-validator");
const middleware = require("../middlewares/middlewares.js");
// create contact
router.post(
  "/create-contact",
  [
    body("name")
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters"),
    body("userId")
      .isLength({ min: 3 })
      .withMessage("User ID must be at least 3 characters"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters"),
  ],
  controller.createAccount
);

// delete contact
router.delete(
  "/delete-contact",
  [
    body("userId")
      .isLength({ min: 3 })
      .withMessage("User ID must be at least 3 characters"),
    body("password")
      .isLength({ min: 3 })
      .withMessage("Password must be at least 5 characters"),
  ],
  controller.login
);

// get contact
router.get(
  "/get-contact",
  middleware.tokenValidator,
  controller.getUserDetails
);

// edit contact
router.put("/edit-contact", middleware.tokenValidator, controller.editProfile);

module.exports = router;
