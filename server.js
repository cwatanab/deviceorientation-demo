var express = require("express");
var app = express();
var http = require("http").Server(app);
const io = require("socket.io")(http);
const PORT = process.env.PORT || 8000;

app.use(express.static('public'));

io.on("connection", function (socket) {
  console.log("connected");
  socket.on("motion", function (message) {
    console.log(message);
  });
  socket.on("orientation", function (message) {
    // console.log(message);
    io.emit("orientation", message);
  });
});

http.listen(PORT, function () {
  console.log("Server listening. Port:" + PORT);
});
