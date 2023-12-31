const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("join_the_room", (data) => {
    socket.join(data);
    console.log(`User:${socket.id} connected with room id:${data}`);
  });
  socket.on("send_the_message", (data) => {
    console.log(
      "room id is: ",
      data.roomId,
      " and type is: ",
      typeof data.roomId
    );
    // socket.broadcast.emit("get_message", data);
    socket.broadcast.to(data.roomId).emit("get_message", data);
  });

  socket.on("disconnect", () => {
    console.log("Disconnected user:", socket.id);
  });
}); //events

server.listen(process.env.PORT || 3001, () => {
  console.log("Server is listening on port 3001");
});
