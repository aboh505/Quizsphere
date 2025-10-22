"use client";

import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Users, Trophy, Clock, Zap } from "lucide-react";
import confetti from "canvas-confetti";

let socket;

export default function MultiplayerPage() {
  const [screen, setScreen] = useState("menu"); // menu, waiting, playing, results
  const [playerName, setPlayerName] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [theme, setTheme] = useState("maths");
  const [players, setPlayers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(5);
  const [answer, setAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(15);
  const [winner, setWinner] = useState(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    socketInitializer();

    return () => {
      if (socket) socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (screen === "playing" && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && screen === "playing") {
      handleSubmitAnswer();
    }
  }, [timeLeft, screen]);

  const socketInitializer = async () => {
    await fetch("/api/socket");
    socket = io();

    socket.on("connect", () => {
      console.log("Connecté au serveur Socket.io");
    });

    socket.on("room-created", ({ roomCode }) => {
      setRoomCode(roomCode);
      setScreen("waiting");
      setError("");
    });

    socket.on("players-update", (updatedPlayers) => {
      setPlayers(updatedPlayers);
      const playerCount = Object.keys(updatedPlayers).length;
      if (playerCount === 2 && screen === "waiting") {
        // Le quiz démarre automatiquement quand 2 joueurs sont présents
      }
    });

    socket.on("start-quiz", ({ question, questionIndex, totalQuestions }) => {
      setCurrentQuestion(question);
      setQuestionIndex(questionIndex);
      setTotalQuestions(totalQuestions);
      setScreen("playing");
      setTimeLeft(15);
      setAnswer("");
    });

    socket.on("next-question", ({ question, questionIndex, players: updatedPlayers }) => {
      setCurrentQuestion(question);
      setQuestionIndex(questionIndex);
      setPlayers(updatedPlayers);
      setTimeLeft(15);
      setAnswer("");
    });

    socket.on("quiz-end", ({ winner, players: finalPlayers }) => {
      setPlayers(finalPlayers);
      setWinner(winner);
      setScreen("results");
      if (winner.id === socket.id) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
    });

    socket.on("error", (message) => {
      setError(message);
    });

    socket.on("player-left", ({ players: updatedPlayers }) => {
      setPlayers(updatedPlayers);
      if (Object.keys(updatedPlayers).length < 2 && screen === "playing") {
        setError("Un joueur a quitté la partie");
        setTimeout(() => {
          setScreen("menu");
          resetGame();
        }, 3000);
      }
    });
  };

  const createRoom = () => {
    if (!playerName.trim()) {
      setError("Veuillez entrer votre nom");
      return;
    }
    socket.emit("create-room", { playerName: playerName.trim(), theme });
  };

  const joinRoom = () => {
    if (!playerName.trim() || !roomCode.trim()) {
      setError("Veuillez entrer votre nom et le code de la salle");
      return;
    }
    socket.emit("join-room", { roomCode: roomCode.trim().toUpperCase(), playerName: playerName.trim() });
  };

  const handleSubmitAnswer = () => {
    if (socket && roomCode) {
      const isCorrect = answer.toLowerCase().trim() === currentQuestion?.a.toLowerCase().trim();
      socket.emit("submit-answer", { roomCode, answer, correct: isCorrect });
      setAnswer("");
    }
  };

  const copyRoomCode = () => {
    navigator.clipboard.writeText(roomCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetGame = () => {
    setScreen("menu");
    setPlayerName("");
    setRoomCode("");
    setTheme("maths");
    setPlayers({});
    setCurrentQuestion(null);
    setQuestionIndex(0);
    setAnswer("");
    setTimeLeft(15);
    setWinner(null);
    setError("");
  };

  const themes = [
    { value: "geographie", label: "Géographie", icon: "🌍" },
    { value: "maths", label: "Mathématiques", icon: "🔢" },
    { value: "culture", label: "Culture Générale", icon: "📚" },
    { value: "histoire", label: "Histoire", icon: "📜" },
    { value: "sciences", label: "Sciences", icon: "🔬" },
    { value: "sport", label: "Sport", icon: "⚽" },
    { value: "musique", label: "Musique", icon: "🎵" },
    { value: "cinema", label: "Cinéma", icon: "🎬" },
    { value: "actualite", label: "Actualité", icon: "📰" },
    { value: "technologie", label: "Technologie", icon: "💻" },
    { value: "litterature", label: "Littérature", icon: "📖" },
    { value: "langues", label: "Langues", icon: "🗣️" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {/* MENU PRINCIPAL */}
          {screen === "menu" && (
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-3xl shadow-2xl p-8 md:p-12"
            >
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="inline-block mb-4"
                >
                  <Users className="w-20 h-20 text-purple-600 mx-auto" />
                </motion.div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
                  Mode Multijoueur
                </h1>
                <p className="text-gray-600 text-lg">
                  Affrontez un adversaire en temps réel !
                </p>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6"
                >
                  {error}
                </motion.div>
              )}

              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Votre nom
                  </label>
                  <input
                    type="text"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    placeholder="Entrez votre nom"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none transition"
                    maxLength={20}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Choisissez un thème
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 max-h-96 overflow-y-auto p-2">
                    {themes.map((t) => (
                      <button
                        key={t.value}
                        onClick={() => setTheme(t.value)}
                        className={`p-3 rounded-xl border-2 transition-all hover:scale-105 ${
                          theme === t.value
                            ? "border-purple-500 bg-purple-50 shadow-lg scale-105"
                            : "border-gray-300 hover:border-purple-300 hover:shadow-md"
                        }`}
                      >
                        <div className="text-2xl mb-1">{t.icon}</div>
                        <div className="text-xs font-medium text-gray-700">{t.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={createRoom}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition"
                  >
                    Créer une salle
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setScreen("join")}
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition"
                  >
                    Rejoindre une salle
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ÉCRAN REJOINDRE */}
          {screen === "join" && (
            <motion.div
              key="join"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-3xl shadow-2xl p-8 md:p-12"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                Rejoindre une salle
              </h2>

              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
                  {error}
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Votre nom
                  </label>
                  <input
                    type="text"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    placeholder="Entrez votre nom"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition"
                    maxLength={20}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Code de la salle
                  </label>
                  <input
                    type="text"
                    value={roomCode}
                    onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                    placeholder="Entrez le code"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition uppercase"
                    maxLength={6}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => {
                      setScreen("menu");
                      setError("");
                    }}
                    className="bg-gray-300 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-400 transition"
                  >
                    Retour
                  </button>
                  <button
                    onClick={joinRoom}
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition"
                  >
                    Rejoindre
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* SALLE D'ATTENTE */}
          {screen === "waiting" && (
            <motion.div
              key="waiting"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-3xl shadow-2xl p-8 md:p-12"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Salle d'attente
                </h2>
                <p className="text-gray-600 mb-6">
                  Partagez ce code avec votre adversaire
                </p>

                <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 mb-6">
                  <div className="flex items-center justify-center gap-4">
                    <span className="text-5xl font-bold text-purple-600 tracking-wider">
                      {roomCode}
                    </span>
                    <button
                      onClick={copyRoomCode}
                      className="p-3 bg-white rounded-xl hover:bg-gray-50 transition shadow"
                      title="Copier le code"
                    >
                      <Copy className={`w-6 h-6 ${copied ? "text-green-500" : "text-gray-600"}`} />
                    </button>
                  </div>
                  {copied && (
                    <p className="text-green-600 text-sm mt-2">Code copié !</p>
                  )}
                </div>

                <div className="mb-6">
                  <p className="text-gray-700 font-semibold mb-3">
                    Joueurs connectés ({Object.keys(players).length}/2)
                  </p>
                  <div className="space-y-2">
                    {Object.values(players).map((player, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-gray-100 rounded-xl p-3 flex items-center justify-center gap-2"
                      >
                        <Users className="w-5 h-5 text-purple-600" />
                        <span className="font-medium text-gray-800">{player.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {Object.keys(players).length < 2 && (
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="text-gray-500"
                  >
                    En attente d'un adversaire...
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {/* JEU EN COURS */}
          {screen === "playing" && currentQuestion && (
            <motion.div
              key="playing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-3xl shadow-2xl p-8 md:p-12"
            >
              {/* En-tête avec scores */}
              <div className="flex justify-between items-center mb-6">
                <div className="text-sm text-gray-600">
                  Question {questionIndex}/{totalQuestions}
                </div>
                <div className="flex items-center gap-2 text-red-600 font-bold">
                  <Clock className="w-5 h-5" />
                  <span className="text-2xl">{timeLeft}s</span>
                </div>
              </div>

              {/* Scores des joueurs */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {Object.values(players).map((player, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl ${
                      player.id === socket?.id
                        ? "bg-purple-100 border-2 border-purple-500"
                        : "bg-gray-100"
                    }`}
                  >
                    <div className="font-semibold text-gray-800">{player.name}</div>
                    <div className="text-2xl font-bold text-purple-600">
                      {player.score} pts
                    </div>
                  </div>
                ))}
              </div>

              {/* Question */}
              <motion.div
                key={questionIndex}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 mb-6"
              >
                <h3 className="text-2xl font-bold text-gray-800 text-center">
                  {currentQuestion.q}
                </h3>
              </motion.div>

              {/* Réponse */}
              <div className="space-y-4">
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSubmitAnswer()}
                  placeholder="Votre réponse..."
                  className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none transition text-lg"
                  autoFocus
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmitAnswer}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2"
                >
                  <Zap className="w-5 h-5" />
                  Valider
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* RÉSULTATS */}
          {screen === "results" && winner && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-3xl shadow-2xl p-8 md:p-12"
            >
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="inline-block mb-4"
                >
                  <Trophy className="w-24 h-24 text-yellow-500 mx-auto" />
                </motion.div>
                <h2 className="text-4xl font-bold text-gray-800 mb-3">
                  {winner.id === socket?.id ? "🎉 Victoire !" : "Partie terminée"}
                </h2>
                <p className="text-xl text-gray-600">
                  Le gagnant est <span className="font-bold text-purple-600">{winner.name}</span>
                </p>
              </div>

              {/* Scores finaux */}
              <div className="space-y-4 mb-8">
                {Object.values(players)
                  .sort((a, b) => b.score - a.score)
                  .map((player, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className={`p-6 rounded-xl flex justify-between items-center ${
                        idx === 0
                          ? "bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-500"
                          : "bg-gray-100"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{idx === 0 ? "🥇" : "🥈"}</span>
                        <span className="font-bold text-gray-800 text-lg">{player.name}</span>
                      </div>
                      <span className="text-3xl font-bold text-purple-600">
                        {player.score} pts
                      </span>
                    </motion.div>
                  ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={resetGame}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition"
              >
                Nouvelle partie
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}