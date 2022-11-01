const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/game", (req, res) => {
  res.sendFile(__dirname + "/game.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("move", (msg) => {
    io.emit("move", msg);
  });
});

server.listen(PORT, () => {
  console.log("server started on port " + PORT);
});
