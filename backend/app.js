// db configurations
require("dotenv").config();
const connectionToDb = require("./db.js");
connectionToDb();

// express configurations
const http = require("http");
const express = require("express");
const { Server } = require("socket.io");
const cors = require("cors");
const app = express();
const corsOrigin = [
  "http://localhost:8080",
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002",
  "http://localhost:3003",
  "http://localhost:3004",
  "http://localhost:4000",
  "http://localhost:5174",
  "https://ofenup.waqarahmad.online",
];

const corsSetting = {
  origin: corsOrigin,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true,
};

app.use(cors(corsSetting));
app.use(express.json());

// routers
const auth = require("./routers/auth.js");
const message = require("./routers/message.js");
const contact = require("./routers/contact.js");
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Backend for OfenUp is deployed properly",
  });
});
app.get("/api", (req, res) => {
  res.status(200).json({
    message: "Backend for OfenUp is deployed properly you are on /api",
  });
});
app.use("/api/auth", auth);
app.use("/api/message", message);
app.use("/api/contact", contact);

// error and not found
app.use((req, res) => {
  res.status(404).json({
    message: "Wrong URL or API",
  });
});

// socket connection
const server = http.createServer(app);
const io = new Server(server);
io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
});

// listening app
server.listen(process.env.PORT, () => {
  console.log("connected to port http://localhost:" + process.env.PORT);
});
