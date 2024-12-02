const mongoose = require("mongoose");
const { Schema } = mongoose;

const authSchema = new Schema({
  name: { type: String, required: true },
  userId: {
    type: String,
    unique: true,
    required: true,
  },
  password: { type: String, required: true },
  visibilityType: {
    type: String,
    enum: ["public", "private"],
    default: "public",
    required: true,
  },
  profile: {
    type: String,
  },
});

const Auth = mongoose.model("auth", authSchema);

module.exports = Auth;
