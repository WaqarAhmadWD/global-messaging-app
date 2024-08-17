const mongoose = require("mongoose");
const { Schema } = mongoose;
const contact = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "auth" },
  name: { type: String, required: true },
  contactId: { type: String, required: true },
});
module.exports = mongoose.model("contact", contact);
