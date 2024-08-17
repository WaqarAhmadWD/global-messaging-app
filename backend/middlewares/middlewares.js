const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.tokenValidator = async (req, res, next) => {
  try {
    const token = req.header("token");
    if (token) {
      const validator = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
      if (validator) {
        req.user = await { id: validator };
      }
    } else {
      return res.json({
        success: false,
        error: true,
        errors: { msg: "wrong token" },
      });
    }
    next();
  } catch (error) {
    res.json({
      success: false,
      error: true,
      errors: { msg: "something went wrong in token verification!" },
    });
  }
};
