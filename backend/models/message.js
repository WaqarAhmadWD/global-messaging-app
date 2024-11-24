const mongoose = require("mongoose");
const { Schema } = mongoose;
const message = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "auth" },
  message: String,
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "auth",
  },
  isSeen: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model("message", message);
