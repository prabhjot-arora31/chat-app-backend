const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://chat-app-31.vercel.app/",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  const realData = [];
  console.log(socket.id);
  socket.on("join_the_room", (data) => {
    socket.join("id:", data);
    console.log(`User:${socket.id} connected with room id:${data}`);
  });
  socket.on("send_the_message", (data) => {
    console.log("room id is: ", data.roomId);
    realData.push(data);
    socket.broadcast.emit("get_message", data);
  });

  socket.on("disconnect", () => {
    console.log("Disconnected user:", socket.id);
  });
}); //events

server.listen(process.env.PORT || 3001, () => {
  console.log("Server is listening on port 3001");
});
