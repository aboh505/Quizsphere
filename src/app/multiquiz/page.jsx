"use client";

import { useEffect, useState } from "react";
import io from "socket.io-client";

let socket;

export default function MultiplayerQuiz() {
  const [step, setStep] = useState("register");
  const [players, setPlayers] = useState([{ name: "", password: "" }, { name: "", password: "" }]);
  const [theme, setTheme] = useState("maths");
  const [roomCode, setRoomCode] = useState("");
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState("");
  const [winner, setWinner] = useState(null);
  const [timer, setTimer] = useState(15);

  useEffect(() => {
    socket = io();

    socket.on("roomCreated", ({ roomCode }) => {
      setRoomCode(roomCode);
      setStep("waiting");
    });

    socket.on("roomJoined", ({ players }) => setPlayers(players));

    socket.on("nextQuestion", ({ question, currentQ, totalQ, players }) => {
      setQuestion({ ...question, currentQ, totalQ });
      setPlayers(players);
      setStep("quiz");
      setTimer(15);
    });

    socket.on("endQuiz", ({ winner, players }) => {
      setWinner(winner);
      setPlayers(players);
      setStep("result");
    });

  }, []);

  useEffect(() => {
    if (step === "quiz" && timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    }
  }, [timer, step]);

  const handleRegister = () => {
    const p1 = players[0];
    socket.emit("createRoom", { theme, name: p1.name });
  };

  const handleJoin = () => {
    const p2 = players[1];
    socket.emit("joinRoom", { roomCode, name: p2.name });
  };

  const submitAnswer = () => {
    if (answer) {
      socket.emit("submitAnswer", { roomCode, answer });
      setAnswer("");
      setTimer(15);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-indigo-50 via-purple-50 to-pink-50">
      {step === "register" && (
        <div className="grid grid-cols-2 gap-10">
          {players.map((p, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="font-bold mb-4">Joueur {idx + 1}</h2>
              <input
                placeholder="Nom"
                value={p.name}
                onChange={(e) => {
                  const newPlayers = [...players];
                  newPlayers[idx].name = e.target.value;
                  setPlayers(newPlayers);
                }}
                className="border p-2 w-full mb-2 rounded"
              />
              <input
                type="password"
                placeholder="Mot de passe"
                value={p.password}
                onChange={(e) => {
                  const newPlayers = [...players];
                  newPlayers[idx].password = e.target.value;
                  setPlayers(newPlayers);
                }}
                className="border p-2 w-full rounded"
              />
            </div>
          ))}
        </div>
      )}
      {step === "register" && (
        <div className="mt-6">
          <label>Choisis un thème : </label>
          <select value={theme} onChange={(e) => setTheme(e.target.value)} className="border p-2 rounded ml-2">
            {Object.keys(questionsByTheme).map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <button onClick={handleRegister} className="ml-4 px-4 py-2 bg-indigo-600 text-white rounded">Créer la salle</button>
        </div>
      )}

      {step === "waiting" && (
        <div className="text-center">
          <p>Salle créée ! Code à partager avec le joueur 2 : <strong>{roomCode}</strong></p>
          <button onClick={handleJoin} className="mt-4 px-4 py-2 bg-green-600 text-white rounded">Rejoindre la salle</button>
        </div>
      )}

      {step === "quiz" && question && (
        <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg">
          <h2 className="font-bold mb-4">{question.q}</h2>
          <p className="mb-2">Question {question.currentQ} / {question.totalQ}</p>
          <p className="mb-4 text-red-500">Temps restant : {timer}s</p>
          <input value={answer} onChange={(e) => setAnswer(e.target.value)} className="border p-2 rounded mb-2 w-full" />
          <button onClick={submitAnswer} className="px-4 py-2 bg-indigo-600 text-white rounded w-full">Envoyer</button>

          <div className="mt-6">
            <h3 className="font-bold mb-2">Scores :</h3>
            {players.map(p => (
              <p key={p.id}>{p.name}: {p.score}</p>
            ))}
          </div>
        </div>
      )}

      {step === "result" && winner && (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Le vainqueur est {winner.name} ! 🎉</h2>
          <h3 className="font-bold mb-2">Scores finaux :</h3>
          {players.map(p => (
            <p key={p.id}>{p.name}: {p.score}</p>
          ))}
        </div>
      )}
    </div>
  );
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
