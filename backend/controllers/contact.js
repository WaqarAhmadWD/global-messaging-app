const contact = require("../models/contact.js");
const Message = require("../models/message.js");
const { validationResult } = require("express-validator");
const Auth = require("../models/auth.js");
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
    const checkUser = await contact.findOne({ userId: req.user.id, contactId });
    if (checkUser) {
      return res.status(204).json({
        success: false,
        error: true,
        errors: { msg: "You have already this contact!" },
      });
    }
    const cont = await contact.create({ name, userId: req.user.id, contactId });
    res.status(200).json({ success: true, error: false, data: cont });
  } catch (error) {
    res.status(500).json({ success: false, error: true, errors: error });
  }
};

// Get all contacts
exports.getContacts = async (req, res) => {
  try {
    // Fetch contacts and messages
    const contacts = await contact.find({ userId: req.user._id });
    const messages = await Message.find({
      $or: [{ userId: req.user?.id }, { receiver: req.user?.id }],
    })
      .populate({
        path: "userId",
        match: { visibilityType: "public" },
        select: "name userId visibilityType",
      })
      .populate({
        path: "receiver",
        match: { visibilityType: "public" },
        select: "name userId visibilityType",
      })
      .sort({ _id: -1 }); // Sort by most recent messages (based on MongoDB `_id`)

    // Use a Map to store the most recent message and notification count for each user
    const userMessages = new Map();

    messages.forEach((message) => {
      // Determine if the message is from the user or to the user
      const key =
        message.userId?.userId === req.user?.id
          ? message.receiver?.userId
          : message.userId?.userId;

      if (!key) return; // Skip if no valid user ID

      // Initialize or update entry in the Map
      if (!userMessages.has(key)) {
        userMessages.set(key, {
          user: {
            _id: message.userId?._id || message.receiver?._id,
            userId: key,
            name: message.userId?.name || message.receiver?.name,
          },
          message:
            message.userId?.userId === req.user?.id
              ? `me: ${message.message}` // Outgoing message
              : message.message, // Incoming message
          notification: message.isSeen ? 0 : 1, // Start with 1 if not seen
        });
      } else {
        const userEntry = userMessages.get(key);

        // Update the most recent message
        if (message.userId?.userId !== req.user?.id) {
          userEntry.message = message.message; // Incoming message
        }

        // Increment notification count if not seen
        if (!message.isSeen) {
          userEntry.notification++;
        }

        userMessages.set(key, userEntry);
      }
    });

    // Convert the Map to an array of unique users with their last messages
    const uniqueUserMessages = Array.from(userMessages.values());

    return res.status(200).json({
      message: "personal contact fetched successfully",
      data: uniqueUserMessages,
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
    const user = await contact.findOne({
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

    const user = await contact.findOne({
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
    const user = await contact.findOne({
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
    await contact.findOneAndDelete({
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
