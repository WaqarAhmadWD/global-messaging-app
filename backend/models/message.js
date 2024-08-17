const mongoose = require("mongoose");
const { Schema } = mongoose;
const message = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "auth" },
  message: String,
  receiver: { type: String, required: true },
});
module.exports = mongoose.model("message", message);
