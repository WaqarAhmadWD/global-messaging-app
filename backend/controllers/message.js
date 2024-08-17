const message = require("../models/message.js");
exports.createMessage = async (req, res) => {
  const { message, sender, receiver } = req.body;
};
