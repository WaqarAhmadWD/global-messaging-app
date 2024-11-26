const mongoose = require("mongoose");
const { Schema } = mongoose;
const message = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "auth" },
  message: String,
});
module.exports = mongoose.model("messageClub", message);
