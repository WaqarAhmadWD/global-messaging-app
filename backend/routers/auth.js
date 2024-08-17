const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth.js");
const { body } = require("express-validator");
const middleware = require("../middlewares/middlewares.js");
// create account
router.post(
  "/create-account",
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

// login account
router.post(
  "/login",
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

// get data
router.get(
  "/get-user-data",
  middleware.tokenValidator,
  controller.getUserDetails
);

// edit profile
router.put("/edit-profile", middleware.tokenValidator, controller.editProfile);

module.exports = router;
