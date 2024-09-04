const express = require("express");
const app = express();
const http = require("http").Server(app);
const ngrok = require("@ngrok/ngrok");
const io = require("socket.io")(http);
const qrcode = require("qrcode-terminal");

const PORT = process.env.PORT || 8000;

app.use(express.static("public"));

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

http.listen(PORT, async function () {
  console.log(`Server URL: http://localhost:${PORT}/view.html`);
  const listener = await ngrok.forward({
    addr: PORT,
    authtoken_from_env: true,
    // basic_auth: process.env.NGROK_AUTH,
    region: "jp",
    proto: "http",
  });
  console.log(`Ingress established at: ${listener.url()}`);
  qrcode.generate(listener.url(), { small: true });
});
