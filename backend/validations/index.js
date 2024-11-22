const { body } = require("express-validator");

exports.auth = [
  body("userId")
    .isLength({ min: 3 })
    .withMessage("User ID must be at least 3 characters"),
  body("password")
    .isLength({ min: 3 })
    .withMessage("Password must be at least 5 characters"),
];

exports.contact = [
  body("name")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters"),
  body("contactId")
    .isLength({ min: 3 })
    .withMessage("User ID must be at least 3 characters"),
];

exports.message = [
  body("message").notEmpty().withMessage("Message must not be empty"),
];
