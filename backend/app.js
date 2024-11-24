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
  "http://localhost:5173",
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
const dynamic = require("./routers/dynamic.js");
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
app.use("/api/contact", contact);
app.use("/api/dynamic", dynamic);

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
  socket.on("joinRoom", (payload) => {
    socket.join(payload?.id);
    console.log(`Socket joined room: ${payload?.id}`);
  });
  console.log("a user connected", socket.id);
  // You can handle events here
  socket.on("message", (payload) => {
    console.log("here is message data:", payload);
    socket.to(payload?.id).emit("message", payload);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
// listening app
server.listen(process.env.PORT, () => {
  console.log("connected to port http://localhost:" + process.env.PORT);
});
