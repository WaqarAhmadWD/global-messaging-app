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
    body("contactId")
      .isLength({ min: 3 })
      .withMessage("User ID must be at least 3 characters"),
  ],
  middleware.tokenValidator,
  controller.createContact
);

// get contact
router.get(
  "/get-contact",
  middleware.tokenValidator,
  controller.getUserDetails
);

// edit contact
router.put(
  "/edit-contact/:id",
  [
    body("name")
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters"),
    body("userId")
      .isLength({ min: 3 })
      .withMessage("User ID must be at least 3 characters"),
  ],
  middleware.tokenValidator,
  controller.editProfile
);

// delete contact
router.delete(
  "/delete-contact/:id",
  middleware.tokenValidator,
  controller.deleteContact
);

module.exports = router;
