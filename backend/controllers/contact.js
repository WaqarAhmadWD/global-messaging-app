const Contact = require("../models/contact.js");
const { validationResult } = require("express-validator");
const Auth = require("../models/auth.js");
const Message = require("../models/message.js");
const mongoose = require("mongoose");

// create contact
exports.createContact = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors
        .array()
        .map((e) => e.msg)
        .join(", "),
    });
  }
  try {
    const { name, contactId } = req.body;
    const user = await Auth.findOne({ userId: contactId });
    if (!user) {
      return res.status(404).json({
        success: false,
        error: true,
        errors: { msg: "User does not exists!" },
      });
    }
    const checkUser = await Contact.findOne({
      userId: req.user.id,
      contactId: user._id,
    });
    if (checkUser) {
      return res.status(204).json({
        success: false,
        error: true,
        errors: { msg: "You have already this contact!" },
      });
    }
    const cont = await Contact.create({ name, userId: req.user.id, contactId });
    res.status(200).json({ success: true, error: false, data: cont });
  } catch (error) {
    res.status(500).json({ success: false, error: true, errors: error });
  }
};

// get all contact
// Get all contacts
// Get all contacts
exports.getContacts = async (req, res) => {
  try {
    const contact = await Contact.find({ userId: req.user.id });
    if (!contact) {
      return res.status(404).json({
        message: "No contact Found by your Id",
      });
    }
    return res.status(200).json({
      message: "personal contact fetched successfully",
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      message: "something went wrong getting contacts",
    });
  }
};

// get contact by id
exports.getContactDetailsById = async (req, res) => {
  try {
    const user = await Contact.findOne({
      userId: req.user.id,
      contactId: req.params.id,
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        error: true,
        errors: { msg: "User does not exists!" },
      });
    }
    res.status(200).json({
      success: true,
      error: false,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: true,
      errors: error,
    });
  }
};
// edit contact
exports.editContact = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors
        .array()
        .map((e) => e.msg)
        .join(", "),
    });
  }
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name"];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid updates!",
      });
    }

    const user = await Contact.findOne({
      userId: req.user.id,
      contactId: req.params.id,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Contact not found!",
      });
    }

    updates.forEach((update) => {
      user[update] = req.body[update];
    });
    await user.save();
    res.status(201).send({
      success: true,
      error: false,
      message: "User Updated successfuly!",
      data: user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error: true,
      message: "Unable to update user details at the moment.",
      errors: error,
    });
  }
};
// delete contact
exports.deleteContact = async (req, res) => {
  try {
    const user = await Contact.findOne({
      userId: req.user.id,
      contactId: req.params.id,
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        error: true,
        data: { msg: "user does not exist!" },
      });
    }
    await Contact.findOneAndDelete({
      userId: req.user.id,
      contactId: req.params.id,
    });
    res.status(200).json({
      success: true,
      error: false,
      data: { msg: "user deleted successfully!" },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: true,
      errors: error,
    });
  }
};

// get all public contact
exports.getPublicContacts = async (req, res) => {
  try {
    const contacts = await Auth.find({ visibilityType: "public" }).select(
      "-password -visibilityType -__v"
    );

    return res.status(200).json({
      message: "public contacts fetched successfully!",
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      message: "something went wrong getting contacts",
      errors: error,
    });
  }
};
