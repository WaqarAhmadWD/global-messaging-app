const Message = require("../models/message.js");
const messageClubModel = require("../models/messageClub.js");
const { validationResult } = require("express-validator");
const Auth = require("../models/auth.js");
const Contact = require("../models/contact.js");
exports.sendMessage = async (req, res) => {
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
    const { message } = req.body;
    const user = await Auth.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: true,
        errors: { msg: "User does not exist!" },
      });
    }
    const messageResponse = await Message.create({
      message,
      receiver: req.params.id,
      userId: req.user?.id,
    });

    if (!messageResponse) {
      return res.status(400).json({
        message: "Failed to send message",
      });
    }
    const MyContactUpdated = await Contact.findOneAndUpdate(
      { $and: [{ userId: req.user.id }, { contactId: req.params.id }] },
      {
        $set: {
          recent: `me: ${message}`,
          name: user.name,
          userId: req.user.id,
          contactId: req.params.id,
        },
      },
      { upsert: true, new: true }
    );

    const HisContactUpdated = await Contact.findOneAndUpdate(
      { $and: [{ contactId: req.user.id }, { userId: req.params.id }] },
      {
        $set: {
          recent: message,
          name: user.name,
          contactId: req.user.id,
          userId: req.params.id,
        },
        $inc: { notifications: 1 },
      },
      { upsert: true, new: true }
    );
    if (!MyContactUpdated || !HisContactUpdated) {
      return res.status(400).json({
        message: "Failed to update contacts",
      });
    }
    res.status(200).json({
      message: `Message sent successfully from ${req.user?.id} user to ${req.params.id} `,
      data: messageResponse,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: true, errors: error });
  }
};
exports.getMessage = async (req, res) => {
  try {
    const query = {
      $or: [
        { userId: req.user?.id, receiver: req.params.id },
        { receiver: req.user?.id, userId: req.params.id },
      ],
    };
    const limit = 10; // Number of records to fetch
    const skip = parseInt(req.query.skip) || 0; // Number of records to skip from the end
    const totalFields = await Message.countDocuments(query); // Total documents matching the query

    if (skip > totalFields) {
      return res.status(201).json({
        message: "message finished!",
      });
    }
    // Calculate adjusted skip value
    const adjustedSkip = Math.max(totalFields - skip - limit, 0);

    // Fetch the updated messages
    const messages = await Message.find(query)
      .sort({ _id: 1 }) // Fetch in ascending order (oldest to newest)
      .skip(adjustedSkip) // Skip calculated adjusted value
      .limit(limit);

    // Check if any messages were found
    if (!messages || messages.length === 0) {
      return res.status(200).json({
        message: "No messages found",
      });
    }
    const MyContactUpdated = await Contact.findOneAndUpdate(
      { $and: [{ userId: req.user.id }, { contactId: req.params.id }] },
      {
        $set: {
          notifications: 0,
        },
      }
    );
    if (!MyContactUpdated) {
      res.status(500).json({
        message: "Failed while updating your contact!",
      });
    }

    res.status(200).json({
      message: "Messages fetched successfully!",
      data: messages,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      errors: error,
    });
  }
};
exports.sendMessageClub = async (req, res) => {
  try {
    const { message } = req.body;
    const messageResponse = await messageClubModel.create({
      message,
      userId: req.user?.id,
    });

    if (!messageResponse) {
      return res.status(400).json({
        message: "Failed to send message",
      });
    }
    return res.status(200).json({
      message: "message sent successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
exports.getMessageClub = async (req, res) => {
  try {
    const messageResponse = await messageClubModel.find().populate("userId");
    if (!messageResponse) {
      return res.status(201).json({
        message: "No message yet",
      });
    }
    return res.status(200).json({
      message: "all messaged fetched successfully",
      data: messageResponse,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
