const Message = require("../models/message.js");
const { validationResult } = require("express-validator");
const Auth = require("../models/auth.js");
exports.sendMessage = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const { message } = req.body;

  try {
    const user = await Auth.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: true,
        errors: { msg: "User does not exist!" },
      });
    }
    const messageResponse = Message.create({
      message,
      receiver: req.params.id,
      userId: req.user?.id,
    });
    if (!messageResponse) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Failed to send message",
      });
    }
    res.status(200).json({
      success: true,
      error: false,
      message: `Message sent successfully from ${req.user?.id} user to ${req.params.id} `,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: true, errors: error });
  }
};
exports.getMessage = async (req, res) => {
  try {
    // Fetch messages where the user is either the sender or receiver
    const messages = await Message.find({
      $or: [
        { userId: req.user?.id, receiver: req.params.id },
        { receiver: req.user?.id, userId: req.params.id },
      ],
    });

    // Check if any messages were found
    if (!messages || messages.length === 0) {
      return res.status(204).json({
        success: false,
        error: true,
        message: "No messages found",
      });
    }

    res.status(200).json({
      success: true,
      error: false,
      data: messages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: true,
      errors: error,
    });
  }
};
