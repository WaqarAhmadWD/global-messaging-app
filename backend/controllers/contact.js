const contact = require("../models/contact.js");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
require("dotenv").config();

// create contact
exports.createContact = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  try {
    const { name, contactId } = req.body;
    const cont = await contact.create({ name, userId: req.user.id, contactId });
    res.json({ success: true, error: false, data: cont });
  } catch (error) {
    res.json({ success: false, error: true, errors: error });
  }
};

// get all contact
exports.getContacts = async (req, res) => {
  try {
    const contacts = await contact.find({ _id: req.params.id });
    return res.json({
      success: true,
      error: false,
      data: contacts,
    });
  } catch (error) {
    res.json({
      success: false,
      error: true,
      errors: { error, msg: "something went wrong getting contacts" },
    });
  }
};
// get user details
exports.getUserDetails = async (req, res) => {
  try {
    const user = await contact.findOne({ _id: req.user.id });
    const { name, userId, visibilityType } = await user;
    if (!user) {
      return res.json({
        success: false,
        error: true,
        errors: { msg: "User does not exists!" },
      });
    } else {
      res.json({
        success: true,
        error: false,
        data: { name, userId, visibilityType },
      });
    }
  } catch (error) {
    res.json({
      success: false,
      error: true,
      errors: error,
    });
  }
};

// edit profile
exports.editProfile = async (req, res) => {
  const { name, visibilityType } = req.body;
  try {
    const user = await contact.findOne({ _id: req.user.id });
    if (!user) {
      return res.json({
        success: false,
        error: true,
        errors: { msg: "User does not exists!" },
      });
    } else {
      const updatedUser = await contact.updateOne(
        { _id: req.user.id },
        {
          $set: {
            name: name,
            visibilityType: visibilityType,
          },
        }
      );
      res.json({
        success: true,
        error: false,
        data: updatedUser,
      });
    }
  } catch (error) {
    res.json({
      success: false,
      error: true,
      errors: error,
    });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const user = await contact.findOne({ _id: req.user.id });
    if (!user) {
      return res.json({
        success: false,
        error: true,
        data: { msg: "user does not exist!" },
      });
    }
    await contact.findOneAndDelete({ _id: req.user.id });
    res.json({
      success: true,
      error: false,
      data: { msg: "user deleted successfully!" },
    });
  } catch (error) {
    res.json({
      success: false,
      error: true,
      errors: error,
    });
  }
};
