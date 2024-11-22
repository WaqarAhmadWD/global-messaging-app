const jwt = require("jsonwebtoken");
const Auth = require("../models/auth.js");
const { validationResult } = require("express-validator");
const { auth, contact, message } = require("../validations");
const validators = [auth, contact, message];

require("dotenv").config();
const tokenValidator = async (req, res, next) => {
  try {
    // const token = req.header("Authorization");

    const token = req.headers["authorization"]?.split(" ")[1];
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
      error,
    });
  }
};
const Admin = async (req, res, next) => {
  try {
    // const token = req.header("Authorization");
    if (req.user && req.user.role && req.user.role === "admin") {
      next();
    } else {
      return res.status(401).json({
        message: "You are not authorized to access this route!",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "something went wrong in admin verification!",
      error,
    });
  }
};

const bodyValidator = async (req, res, next) => {
  validators[req.params.model];
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: errors
        .array()
        .map((e) => e.msg)
        .join(", "),
    });
  }
  next();
};

const userInfo = async (req, res, next) => {
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

// =================================================================

// Token Validator Middleware

// Role-Based Access Control (RBAC) Middleware
const checkPermissions = (allowedRoles = []) => {
  return async (req, res, next) => {
    try {
      const user = await Auth.findById(req.user.userId); // Fetch user details
      if (!user || !allowedRoles.includes(user.role)) {
        return res
          .status(403)
          .json({ message: "Access denied. Insufficient permissions." });
      }
      next();
    } catch (err) {
      res
        .status(500)
        .json({ message: "Server error while verifying permissions." });
    }
  };
};

// Model-Specific Middleware
const modelSpecificMiddleware = (method, modelName) => {
  return async (req, res, next) => {
    const { middleware } = options[modelName] || {};
    if (middleware && middleware.tokenValidator?.includes(method)) {
      return tokenValidator(req, res, next); // Apply token validation
    }
    next(); // Continue if no specific middleware required
  };
};

module.exports = {
  tokenValidator,
  userInfo,
  checkPermissions,
  modelSpecificMiddleware,
  bodyValidator,
  Admin,
};
