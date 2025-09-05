// server.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

const rooms = {}; // Stocke les salles et leurs joueurs

const questionsByTheme = {
  maths: [
    { q: "Combien font 17 * 23 ?", a: "391" },
    { q: "Résoudre : 2x + 7 = 21", a: "7" },
    { q: "Intégrale de x dx ?", a: "0.5*x^2" },
  ],
  physique: [
    { q: "Formule de la vitesse ?", a: "v = d/t" },
    { q: "Énergie cinétique ?", a: "E = 0.5*m*v^2" },
  ],
  culture: [
    { q: "Capitale de l'Australie ?", a: "Canberra" },
    { q: "Auteur de '1984' ?", a: "George Orwell" },
  ],
  logique: [
    { q: "Suite logique : 2,4,8,16, ?", a: "32" },
    { q: "Si tous les A sont B et tous les B sont C, alors ?", a: "Tous les A sont C" },
  ],
};

io.on("connection", (socket) => {
  console.log("Utilisateur connecté :", socket.id);

  // Création de salle
  socket.on("createRoom", ({ name, theme }) => {
    const code = Math.random().toString(36).substring(2, 7).toUpperCase();
    rooms[code] = {
      theme,
      players: [{ id: socket.id, name, score: 0 }],
      questionIndex: 0,
    };
    socket.join(code);
    socket.emit("roomCreated", { roomCode: code });
  });

  // Rejoindre une salle
  socket.on("joinRoom", ({ name, roomCode }) => {
    const room = rooms[roomCode];
    if (!room) {
      socket.emit("errorRoom", "Salle introuvable !");
      return;
    }
    room.players.push({ id: socket.id, name, score: 0 });
    socket.join(roomCode);
    io.to(roomCode).emit("roomJoined", { players: room.players });

    // Lancer la première question
    const q = questionsByTheme[room.theme][room.questionIndex];
    io.to(roomCode).emit("nextQuestion", q);
  });

  // Réponse d'un joueur
  socket.on("submitAnswer", ({ roomCode, answer }) => {
    const room = rooms[roomCode];
    if (!room) return;

    const q = questionsByTheme[room.theme][room.questionIndex];
    const player = room.players.find((p) => p.id === socket.id);
    if (!player) return;

    if (answer.trim() === q.a.trim()) {
      player.score += 1;
    }

    // Passer à la question suivante
    room.questionIndex += 1;
    if (room.questionIndex < questionsByTheme[room.theme].length) {
      const nextQ = questionsByTheme[room.theme][room.questionIndex];
      io.to(roomCode).emit("nextQuestion", nextQ);
    } else {
      // Fin du quiz
      const winner = room.players.reduce((prev, curr) => (curr.score > prev.score ? curr : prev), room.players[0]);
      io.to(roomCode).emit("endQuiz", { winner, players: room.players });
      delete rooms[roomCode]; // Supprimer la salle
    }
  });

  socket.on("disconnect", () => {
    console.log("Utilisateur déconnecté :", socket.id);
    // On pourrait aussi nettoyer les salles si un joueur part
  });
});

const PORT = 4000;
server.listen(PORT, () => console.log(`Serveur Socket.io lancé sur http://localhost:${PORT}`));
