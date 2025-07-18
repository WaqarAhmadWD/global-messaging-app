const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth.js");
const { body } = require("express-validator");
const middleware = require("../middlewares/middlewares.js");
const { userProfileUpload } = require("../middlewares/uploads.js");

// create user
router.post(
  "/create",
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

// login user
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

// get user
router.get("/get", middleware.tokenValidator, controller.getUserDetails);

// edit user
router.put(
  "/update",
  middleware.tokenValidator,
  userProfileUpload.single("profile"),
  [
    body("name")
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters"),
    body("visibilityType").notEmpty().withMessage("visibilityType is missing"),
  ],
  controller.editProfile
);

// delete user
router.delete("/delete", middleware.tokenValidator, controller.deleteUser);
module.exports = router;
