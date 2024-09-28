const express = require("express");
const router = express.Router();
const controller = require("../controllers/contact.js");
const { body } = require("express-validator");
const middleware = require("../middlewares/middlewares.js");
// create contact
router.post(
  "/create",
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
router.get("/get", middleware.tokenValidator, controller.getContacts);

// get contact by id
router.get(
  "/get/:id",
  middleware.tokenValidator,
  controller.getContactDetailsById
);

// edit contact
router.put(
  "/update/:id",
  [
    body("name")
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters"),
  ],
  middleware.tokenValidator,
  controller.editContact
);

// delete contact
router.delete(
  "/delete/:id",
  middleware.tokenValidator,
  controller.deleteContact
);

module.exports = router;
