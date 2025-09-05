import { Server } from "socket.io";

let rooms = {}; // { roomCode: { theme, players: [{id, name, score}], currentQ: 0 } }

export default function handler(req, res) {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("New client connected:", socket.id);

      socket.on("createRoom", ({ theme, name }) => {
        const roomCode = Math.random().toString(36).substring(2, 7).toUpperCase();
        rooms[roomCode] = {
          theme,
          players: [{ id: socket.id, name, score: 0 }],
          currentQ: 0,
        };
        socket.join(roomCode);
        socket.emit("roomCreated", { roomCode });
      });

      socket.on("joinRoom", ({ roomCode, name }) => {
        const room = rooms[roomCode];
        if (room && room.players.length < 2) {
          room.players.push({ id: socket.id, name, score: 0 });
          socket.join(roomCode);
          io.to(roomCode).emit("roomJoined", { players: room.players });
          startQuiz(io, roomCode);
        } else {
          socket.emit("error", { message: "Salle introuvable ou pleine" });
        }
      });

      socket.on("submitAnswer", ({ roomCode, answer }) => {
        const room = rooms[roomCode];
        if (!room) return;
        const q = questionsByTheme[room.theme][room.currentQ];
        const player = room.players.find((p) => p.id === socket.id);
        if (player && q.a.toString().toLowerCase() === answer.toString().toLowerCase()) {
          player.score += 1;
        }
        room.currentQ += 1;
        clearTimeout(room.timer);

        if (room.currentQ >= questionsByTheme[room.theme].length) {
          const winner = room.players.reduce((a, b) => (a.score >= b.score ? a : b));
          io.to(roomCode).emit("endQuiz", { winner, players: room.players });
          delete rooms[roomCode];
        } else {
          sendNextQuestion(io, roomCode);
        }
      });

      socket.on("disconnect", () => {
        console.log("Client disconnected", socket.id);
      });
    });

    function startQuiz(io, roomCode) {
      const room = rooms[roomCode];
      room.currentQ = 0;
      sendNextQuestion(io, roomCode);
    }

    function sendNextQuestion(io, roomCode) {
      const room = rooms[roomCode];
      const q = questionsByTheme[room.theme][room.currentQ];
      io.to(roomCode).emit("nextQuestion", { question: q, currentQ: room.currentQ + 1, totalQ: questionsByTheme[room.theme].length, players: room.players });

      // Timer 15s par question
      room.timer = setTimeout(() => {
        room.currentQ += 1;
        if (room.currentQ >= questionsByTheme[room.theme].length) {
          const winner = room.players.reduce((a, b) => (a.score >= b.score ? a : b));
          io.to(roomCode).emit("endQuiz", { winner, players: room.players });
          delete rooms[roomCode];
        } else {
          sendNextQuestion(io, roomCode);
        }
      }, 15000);
    }
  }
  res.end();
}

const questionsByTheme = {
  maths: [
    { q: "Résous : 15 × 12 ÷ 3", a: "60" },
    { q: "Quel est le carré de 17 ?", a: "289" },
    { q: "Factorielle de 6 ?", a: "720" },
    { q: "Résous : 9x - 4 = 23", a: "3" },
    { q: "Intégrale de x² dx ?", a: "x^3/3" },
  ],
  physique: [
    { q: "Force = masse × ?", a: "acceleration" },
    { q: "Énergie cinétique = 1/2 × m × ?", a: "v^2" },
    { q: "Pression = force / ?", a: "surface" },
    { q: "Vitesse de la lumière en m/s ?", a: "299792458" },
    { q: "Accélération gravitationnelle sur Terre ?", a: "9.8" },
  ],
  culture: [
    { q: "Capitale du Kazakhstan ?", a: "Noursoultan" },
    { q: "Auteur de 'À la recherche du temps perdu' ?", a: "Marcel Proust" },
    { q: "Combien de pays dans l'UE ?", a: "27" },
    { q: "Plus haut sommet du monde ?", a: "Everest" },
    { q: "Année de la chute du mur de Berlin ?", a: "1989" },
  ],
  logique: [
    { q: "Si A > B et B > C, alors A ? C", a: ">" },
    { q: "Complète la suite : 2, 6, 12, 20, ?", a: "30" },
    { q: "Un train met 2h pour faire 100 km, vitesse ?", a: "50" },
    { q: "Énigme : un père a 4 fils et chaque fils a 1 sœur, combien de personnes ?", a: "5" },
    { q: "Quel nombre complète : 1,1,2,3,5,8, ?", a: "13" },
  ],
};
