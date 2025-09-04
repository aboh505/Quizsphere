import { Server } from "socket.io";

export default function handler(req, res) {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("Nouvelle connexion :", socket.id);

      socket.on("join-room", ({ room, player }) => {
        socket.join(room);
        io.to(room).emit("players-update", { room, player, action: "joined" });
      });

      socket.on("answer", ({ room, player, answer }) => {
        io.to(room).emit("player-answer", { player, answer });
      });

      socket.on("finish", ({ room, winner }) => {
        io.to(room).emit("game-finished", { winner });
      });
    });
  }
  res.end();
}
