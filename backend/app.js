// db configurations
require("dotenv").config();
const connectionToDb = require("./db.js");
connectionToDb();

// express configurations
const http = require("http");
const express = require("express");
const cors = require("cors");
const app = express();
const corsOrigin = [
  "localhost:8080",
  "localhost:3000",
  "localhost:3001",
  "localhost:4000",
  "localhost:5174",
];
const corsSetting = {
  origin: corsOrigin,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true,
};
app.use(cors(corsSetting));
app.use(express.json());
app.get("/", (req, res) => {
  try {
    res.json({ success: true, error: false, message: "api is working fine" });
  } catch (error) {
    res.json(error);
  }
});
// routers
const auth = require("./routers/auth.js");
const message = require("./routers/message.js");
const contact = require("./routers/contact.js");
app.use("/api/auth", auth);
app.use("/api/message", message);
app.use("/api/contact", contact);

//listening app
const server = http.createServer(app);
server.listen(process.env.PORT, () => {
  console.log("connected to port http://localhost:" + process.env.PORT);
});
