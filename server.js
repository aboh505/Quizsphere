const { createServer } = require("http");
const { Server } = require("socket.io");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// Questions par thème
const questionsByTheme = {
  geographie: [
    { q: "Quelle est la capitale de la France ?", a: "Paris" },
    { q: "Quel est le plus grand océan ?", a: "Pacifique" },
    { q: "Combien de continents y a-t-il ?", a: "7" },
    { q: "Quelle est la capitale du Japon ?", a: "Tokyo" },
    { q: "Quel pays a la plus grande superficie ?", a: "Russie" },
  ],
  maths: [
    { q: "Résous : 15 × 12 ÷ 3", a: "60" },
    { q: "Quel est le carré de 17 ?", a: "289" },
    { q: "Factorielle de 6 ?", a: "720" },
    { q: "Résous : 9x - 4 = 23", a: "3" },
    { q: "2 + 2 = ?", a: "4" },
  ],
  culture: [
    { q: "Qui a écrit 'Roméo et Juliette' ?", a: "Shakespeare" },
    { q: "Qui a peint la Joconde ?", a: "Léonard de Vinci" },
    { q: "Combien de pays dans l'UE ?", a: "27" },
    { q: "Plus haut sommet du monde ?", a: "Everest" },
    { q: "Année de la chute du mur de Berlin ?", a: "1989" },
  ],
  histoire: [
    { q: "Qui a été le premier président des USA ?", a: "George Washington" },
    { q: "En quelle année a eu lieu la Révolution française ?", a: "1789" },
    { q: "Qui a découvert l'Amérique ?", a: "Christophe Colomb" },
    { q: "Quelle civilisation a construit les pyramides ?", a: "Égyptienne" },
    { q: "En quelle année a eu lieu la Première Guerre mondiale ?", a: "1914" },
  ],
  sciences: [
    { q: "Quel est le symbole chimique de l'eau ?", a: "H2O" },
    { q: "Quel est le plus grand mammifère ?", a: "Baleine bleue" },
    { q: "Combien de planètes dans le système solaire ?", a: "8" },
    { q: "Quelle est la vitesse de la lumière ?", a: "300000" },
    { q: "Quel gaz respirons-nous ?", a: "Oxygène" },
  ],
  sport: [
    { q: "Combien de joueurs dans une équipe de football ?", a: "11" },
    { q: "Quel sport utilise un ballon ovale ?", a: "Rugby" },
    { q: "Combien de points pour un panier au basket ?", a: "2" },
    { q: "Quelle équipe a remporté le plus de Coupes du Monde ?", a: "Brésil" },
    { q: "Combien de sets pour gagner au tennis ?", a: "3" },
  ],
  musique: [
    { q: "Qui a chanté 'Thriller' ?", a: "Michael Jackson" },
    { q: "Quel instrument a 6 cordes ?", a: "Guitare" },
    { q: "Qui a composé 'La Symphonie n°9' ?", a: "Beethoven" },
    { q: "Quel groupe a chanté 'Bohemian Rhapsody' ?", a: "Queen" },
    { q: "Qui a chanté 'Imagine' ?", a: "John Lennon" },
  ],
  cinema: [
    { q: "Qui a réalisé 'Titanic' ?", a: "James Cameron" },
    { q: "Quel film a remporté l'Oscar du meilleur film en 2020 ?", a: "Parasite" },
    { q: "Qui joue Iron Man ?", a: "Robert Downey Jr" },
    { q: "Qui joue Harry Potter ?", a: "Daniel Radcliffe" },
    { q: "Quel film raconte l'histoire du Titanic ?", a: "Titanic" },
  ],
  actualite: [
    { q: "Quel pays a organisé la Coupe du Monde 2022 ?", a: "Qatar" },
    { q: "Quelle monnaie est utilisée en Europe ?", a: "Euro" },
    { q: "Qui est le PDG de Tesla ?", a: "Elon Musk" },
    { q: "Quel pays a lancé le premier satellite ?", a: "URSS" },
    { q: "Quelle est la capitale de l'Australie ?", a: "Canberra" },
  ],
  technologie: [
    { q: "Qui a fondé Microsoft ?", a: "Bill Gates" },
    { q: "Quel langage est utilisé pour le web ?", a: "HTML" },
    { q: "Quel réseau social a été créé en 2004 ?", a: "Facebook" },
    { q: "Qui a fondé Apple ?", a: "Steve Jobs" },
    { q: "En quelle année Google a-t-il été fondé ?", a: "1998" },
  ],
  litterature: [
    { q: "Qui a écrit 'Les Misérables' ?", a: "Victor Hugo" },
    { q: "Qui a écrit '1984' ?", a: "George Orwell" },
    { q: "Qui a écrit 'Le Petit Prince' ?", a: "Antoine de Saint-Exupéry" },
    { q: "Qui a créé 'Le Seigneur des Anneaux' ?", a: "Tolkien" },
    { q: "Qui a écrit 'Candide' ?", a: "Voltaire" },
  ],
  langues: [
    { q: "Quelle est la langue la plus parlée au monde ?", a: "Chinois" },
    { q: "Quelle langue est officielle au Brésil ?", a: "Portugais" },
    { q: "Quelle langue est parlée en Égypte ?", a: "Arabe" },
    { q: "Quelle langue est parlée au Japon ?", a: "Japonais" },
    { q: "Quelle est la langue officielle en Inde ?", a: "Hindi" },
  ],
};

app.prepare().then(() => {
  const server = createServer((req, res) => handle(req, res));
  const io = new Server(server);

  let rooms = {}; // { roomCode: { players: { socketId: {id, name, score} }, theme, questionIndex, timer } }

  io.on("connection", (socket) => {
    console.log("Connexion:", socket.id);

    // Créer une salle
    socket.on("create-room", ({ playerName, theme }) => {
      const roomCode = Math.random().toString(36).slice(2, 8).toUpperCase();
      rooms[roomCode] = {
        players: { [socket.id]: { id: socket.id, name: playerName, score: 0 } },
        theme,
        questionIndex: 0,
        timer: null
      };
      socket.join(roomCode);
      socket.emit("room-created", { roomCode });
      io.to(roomCode).emit("players-update", rooms[roomCode].players);
      console.log(`Salle créée: ${roomCode} par ${playerName}`);
    });

    // Rejoindre une salle
    socket.on("join-room", ({ roomCode, playerName }) => {
      const room = rooms[roomCode];
      if (!room) {
        return socket.emit("error", "Code de salle invalide");
      }
      if (Object.keys(room.players).length >= 2) {
        return socket.emit("error", "La salle est pleine");
      }
      
      room.players[socket.id] = { id: socket.id, name: playerName, score: 0 };
      socket.join(roomCode);
      io.to(roomCode).emit("players-update", room.players);
      console.log(`${playerName} a rejoint la salle ${roomCode}`);

      // Si 2 joueurs sont présents, démarrer le quiz
      if (Object.keys(room.players).length === 2) {
        console.log(`Quiz démarré dans la salle ${roomCode}`);
        startQuiz(io, roomCode);
      }
    });

    // Soumettre une réponse
    socket.on("submit-answer", ({ roomCode, answer, correct }) => {
      const room = rooms[roomCode];
      if (!room) return;

      // Mettre à jour le score si correct
      if (correct && room.players[socket.id]) {
        room.players[socket.id].score += 1;
      }

      // Annuler le timer actuel
      if (room.timer) {
        clearTimeout(room.timer);
        room.timer = null;
      }

      // Passer à la question suivante
      room.questionIndex += 1;

      // Vérifier si le quiz est terminé
      const questions = questionsByTheme[room.theme];
      if (room.questionIndex >= questions.length) {
        endQuiz(io, roomCode);
      } else {
        sendNextQuestion(io, roomCode);
      }
    });

    // Déconnexion
    socket.on("disconnect", () => {
      console.log("Déconnexion:", socket.id);
      for (const roomCode of Object.keys(rooms)) {
        if (rooms[roomCode].players[socket.id]) {
          delete rooms[roomCode].players[socket.id];
          
          // Notifier les autres joueurs
          io.to(roomCode).emit("player-left", { players: rooms[roomCode].players });
          
          // Supprimer la salle si vide
          if (Object.keys(rooms[roomCode].players).length === 0) {
            if (rooms[roomCode].timer) clearTimeout(rooms[roomCode].timer);
            delete rooms[roomCode];
            console.log(`Salle ${roomCode} supprimée`);
          }
        }
      }
    });
  });

  // Fonction pour démarrer le quiz
  function startQuiz(io, roomCode) {
    const room = rooms[roomCode];
    if (!room) return;
    
    room.questionIndex = 0;
    sendNextQuestion(io, roomCode);
  }

  // Fonction pour envoyer la prochaine question
  function sendNextQuestion(io, roomCode) {
    const room = rooms[roomCode];
    if (!room) return;

    const questions = questionsByTheme[room.theme];
    const question = questions[room.questionIndex];

    io.to(roomCode).emit(room.questionIndex === 0 ? "start-quiz" : "next-question", {
      question,
      questionIndex: room.questionIndex + 1,
      totalQuestions: questions.length,
      players: room.players
    });

    // Timer de 15 secondes par question
    room.timer = setTimeout(() => {
      room.questionIndex += 1;
      if (room.questionIndex >= questions.length) {
        endQuiz(io, roomCode);
      } else {
        sendNextQuestion(io, roomCode);
      }
    }, 15000);
  }

  // Fonction pour terminer le quiz
  function endQuiz(io, roomCode) {
    const room = rooms[roomCode];
    if (!room) return;

    if (room.timer) {
      clearTimeout(room.timer);
      room.timer = null;
    }

    // Déterminer le gagnant
    const playersArray = Object.values(room.players);
    const winner = playersArray.reduce((prev, current) => 
      (prev.score >= current.score) ? prev : current
    );

    io.to(roomCode).emit("quiz-end", {
      winner,
      players: room.players
    });

    console.log(`Quiz terminé dans la salle ${roomCode}. Gagnant: ${winner.name}`);

    // Nettoyer la salle après 30 secondes
    setTimeout(() => {
      if (rooms[roomCode]) {
        delete rooms[roomCode];
        console.log(`Salle ${roomCode} nettoyée`);
      }
    }, 30000);
  }

  server.listen(3000, () => console.log("Server running on http://localhost:3000"));
});
