const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth.js");
const { body } = require("express-validator");
const middleware = require("../middlewares/middlewares.js");
// create user
router.post(
  "/create-user",
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
router.get("/get-user", middleware.tokenValidator, controller.getUserDetails);

// edit user
router.put("/edit-user", middleware.tokenValidator, controller.editProfile);

// delete user
router.delete("/delete-user", middleware.tokenValidator, controller.deleteUser);
module.exports = router;
