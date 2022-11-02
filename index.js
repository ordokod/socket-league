const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const PORT = process.env.PORT || 3000;

/* app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/game", (req, res) => {
  res.sendFile(__dirname + "/game.html");
}); */

const players = [];

app.use(express.static("public"));

io.on("connection", (socket) => {
  socket.on("new-player", (player) => {
    console.log("new player connected: ", player);
    socket.broadcast.emit("new-player", player);
  });

  socket.on("player-move", (player) => {
    console.log("player move: ", player);
    socket.broadcast.emit("player-move", player);
  });
});

server.listen(PORT, () => {
  console.log("server started on port " + PORT);
});
