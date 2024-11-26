const mongoose = require("mongoose");
const { Schema } = mongoose;
const contact = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "auth" },
  name: { type: String, required: true },
  contactId: { type: mongoose.Schema.Types.ObjectId, ref: "auth" },
  recent: {
    type: String,
    required: false,
  },
  notifications: {
    type: Number,
    required: false,
  },
});
module.exports = mongoose.model("contact", contact);
