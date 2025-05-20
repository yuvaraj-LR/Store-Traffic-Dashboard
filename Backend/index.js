import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import { getHistoryData } from "./utils/Store/HistoryStore.js";
import startConsumer, { attachSocket } from "./utils/kafka/consumer.js";

dotenv.config();
const app = express();
app.use(cors());

app.get("/api/history", (req, res) => {
  res.json(getHistoryData());
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Frontend connected via WebSocket");
  attachSocket(socket); // Attach socket reference
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  await startConsumer(io); // Start Kafka consumer once
});
