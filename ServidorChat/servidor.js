const express = require("express");
const cors = require("cors");
const http = require("http");

const app = express();
app.use(cors());
const servidor = http.createServer(app);

const socketio = require("socket.io");
const io = socketio(servidor, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("conectado", () => {
    console.log("Usuario conectado");
  });

  socket.on("mensaje", (nombre, mensaje) => {
    io.emit("mensajes", { nombre, mensaje });
  });

  socket.on("disconnect", () => {
    io.emit("mensajes", {
      servidor: "Servidor",
      mensaje: "Ha abandonado la sala",
    });
  });
});

servidor.listen(3000, () => console.log("Servidor inicializado"));
