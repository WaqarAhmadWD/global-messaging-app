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
  const { name, userId } = req.body;
  try {
    let user = await contact.findOne({ userId });
    if (user) {
      return res.status(402).json({
        success: false,
        error: true,
        errors: { msg: "User already existed!" },
      });
    }
    const salt = await bcrypt.genSalt(12, "2b");
    const hash = await bcrypt.hash(password, salt);
    user = await contact.create({
      name,
      userId,
      password: hash,
      visibilityType,
    });

    const token = await jwt.sign(user.id, process.env.TOKEN_SECRET_KEY);
    res.json({
      success: true,
      error: false,
      user,
      token: token,
    });
  } catch (error) {
    res.json({ success: false, error: true, errors: error });
  }
};

// login account
exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const { userId, password } = req.body;
  try {
    const user = await contact.findOne({ userId });
    if (!user) {
      return res.json({
        success: false,
        error: true,
        errors: { msg: "User does not exists!" },
      });
    }
    const verifiedPassword = await bcrypt.compare(password, user.password);
    if (!verifiedPassword) {
      return res.json({
        success: false,
        error: true,
        errors: { msg: "Wrong password" },
      });
    } else {
      const token = await jwt.sign(user.id, process.env.TOKEN_SECRET_KEY);
      res.json({
        success: true,
        error: false,
        token: token,
      });
    }
  } catch (error) {
    res.json({ success: false, error: true, errors: error });
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
