const Auth = require("../models/auth.js");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
require("dotenv").config();

// create account
exports.createAccount = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors
        .array()
        .map((e) => e.msg)
        .join(", "),
    });
  }
  const { name, userId, password, visibilityType } = req.body;
  try {
    let user = await Auth.findOne({ userId });
    if (user) {
      return res.status(402).json({
        message: "",
        error: "Username already exist!",
      });
    }
    const salt = await bcrypt.genSalt(12, "2b");
    const hash = await bcrypt.hash(password, salt);
    user = await Auth.create({
      name,
      userId,
      password: hash,
      visibilityType,
    });
    // Exclude the password field before sending the response
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    const token = await jwt.sign(
      { id: user._id, userId: user.userId },
      process.env.TOKEN_SECRET_KEY
    );
    res.status(201).json({
      message: "User Created Successfully",
      user: userWithoutPassword,
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: "User could not be created",
      errors: error,
    });
  }
};

// login account
exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors
        .array()
        .map((e) => e.msg)
        .join(", "),
    });
  }
  const { userId, password } = req.body;
  try {
    const user = await Auth.findOne({ userId });
    if (!user) {
      return res.status(404).json({
        message: "User does not exist",
        error: "",
      });
    }
    const verifiedPassword = await bcrypt.compare(password, user.password);
    if (!verifiedPassword) {
      return res.status(401).json({
        message: "Credentials are wrong",
        error: "",
      });
    } else {
      const token = await jwt.sign(
        { id: user._id, userId: user.userId },
        process.env.TOKEN_SECRET_KEY
      );
      res.status(200).json({
        message: "Login Successfully!",
        token: token,
        user: {
          _id: user._id,
          name: user.name,
          userId: user.userId,
          visibilityType: user.visibilityType,
        },
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: "", errors: error });
  }
};
// get user details
exports.getUserDetails = async (req, res) => {
  try {
    const user = await Auth.findOne({ _id: req.user.id });
    const { name, userId, visibilityType } = user;
    if (!user) {
      return res.status(404).json({
        message: "User does not exists!",
        error: "",
      });
    } else {
      res.status(200).json({
        message: "User fetched successfully",
        error: "",
        data: { name, userId, visibilityType },
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: "",
    });
  }
};

// edit profile
exports.editProfile = async (req, res) => {
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
    const allowedUpdates = ["name", "visibilityType"];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      return res.status(400).json({ message: "Invalid updates" });
    }

    const user = await Auth.findById(req.user?.id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Handle profile update

    console.log(user.profile);
    // Update other fields
    updates.forEach((update) => {
      user[update] = req.body[update];
    });

    if (req.file) {
      user.profile = `${req.protocol}://${req.get("host")}/uploads/profiles/${
        req.file.filename
      }`;
    }

    await user.save();
    res.status(200).json({
      message: "User updated successfully!",
      data: {
        name: user.name,
        visibilityType: user.visibilityType,
        profile: user.profile,
      },
    });
  } catch (error) {
    console.error("Error in editProfile:", error);
    res.status(500).json({
      message: "Unable to update user details at the moment.",
      error: error.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await Auth.findOne({ _id: req.user.id });
    if (!user) {
      return res.status(404).json({
        message: "user does not exist!",
        error: "",
      });
    }
    await Auth.findOneAndDelete({ _id: req.user.id });
    res.status(200).json({
      message: "user deleted successfully!",
      error: "",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: "",
      errors: error,
    });
  }
};
