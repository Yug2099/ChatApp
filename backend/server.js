const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const cors = require("cors"); // Import CORS middleware
dotenv.config();

connectDB();

const app = express();

app.use(express.json());

// Enable CORS for all requests
app.use(
  cors({
    origin: [
      "https://mychatapp-six.vercel.app",
      "https://my-chat-app-backend-ten.vercel.app",
      "https://vercel.com/yug2099s-projects/my-chat-app-backend/Co8ReiQJCxfFLpUFRYtKhXdiLMKb",
      "https://vercel.com/yug2099s-projects/mychatapp/6MUPyHNSuCXvzEEnt9NrskhJyBjG",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/", (req, res) => {
  res.send("Use Postman to access API endpoints");
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000; // Set a default port if PORT environment variable is not defined

const server = app.listen(PORT, console.log(`Server started at port ${PORT}`));

const WebSocket = require("ws");
const wss = new WebSocket({server});

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    // Broadcast the message to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });

  console.log("Client connected");
});
