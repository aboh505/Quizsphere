const { createServer } = require("http");
const { Server } = require("socket.io");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => handle(req, res));
  const io = new Server(server);

  let rooms = {}; // { roomCode: { players: { socketId: {name, score} }, theme, questionIndex } }

  io.on("connection", (socket) => {
    console.log("Connexion:", socket.id);

    socket.on("create-room", ({ playerName, theme }) => {
      const roomCode = Math.random().toString(36).slice(2, 8).toUpperCase();
      rooms[roomCode] = {
        players: { [socket.id]: { name: playerName, score: 0 } },
        theme,
        questionIndex: 0
      };
      socket.join(roomCode);
      socket.emit("room-created", { roomCode });
    });

    socket.on("join-room", ({ roomCode, playerName }) => {
      if (!rooms[roomCode]) return socket.emit("error", "Code invalide");
      rooms[roomCode].players[socket.id] = { name: playerName, score: 0 };
      socket.join(roomCode);
      io.to(roomCode).emit("players-update", rooms[roomCode].players);
    });

    socket.on("submit-answer", ({ roomCode, correct }) => {
      if (!rooms[roomCode]) return;
      if (correct) rooms[roomCode].players[socket.id].score += 1;

      // passe à la question suivante
      rooms[roomCode].questionIndex += 1;

      io.to(roomCode).emit("update", {
        players: rooms[roomCode].players,
        questionIndex: rooms[roomCode].questionIndex
      });
    });

    socket.on("disconnect", () => {
      for (const roomCode of Object.keys(rooms)) {
        if (rooms[roomCode].players[socket.id]) {
          delete rooms[roomCode].players[socket.id];
          io.to(roomCode).emit("players-update", rooms[roomCode].players);
        }
      }
    });
  });

  server.listen(3000, () => console.log("Server running on http://localhost:3000"));
});
