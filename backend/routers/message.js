const express = require("express");
const router = express.Router();
// get all messages from one user
// send one message
const controller = require("../controllers/message.js");
router.get("/message", (req, res) => {
  res.json({ message: "message" });
});
module.exports = router;
