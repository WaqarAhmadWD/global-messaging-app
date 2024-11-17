const jwt = require("jsonwebtoken");
const Auth = require("../models/auth.js");
require("dotenv").config();
exports.tokenValidator = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (token) {
      const validator = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
      if (validator) {
        req.user = await { id: validator };
      }
    } else {
      return res.status(401).json({
        message: "You are not authorized",
      });
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "something went wrong in token verification!",
    });
  }
};
exports.userInfo = async (req, res, next) => {
  try {
    const user = await Auth.findById(req.user?.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: true,
        errors: { msg: "User not found!" },
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      errors: { msg: "Something went wrong with user data!" },
    });
  }
};
