"use client";

import { useState, useEffect } from "react";
import io from "socket.io-client";

let socket;

export default function Multiplayer() {
  const [step, setStep] = useState("register");
  const [players, setPlayers] = useState([{ name: "", password: "" }, { name: "", password: "" }]);
  const [theme, setTheme] = useState("maths");
  const [roomCode, setRoomCode] = useState("");
  const [inputCode, setInputCode] = useState("");
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState("");
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    socket = io("http://localhost:4000");

    socket.on("roomCreated", ({ roomCode }) => {
      setRoomCode(roomCode);
      setStep("waiting");
    });

    socket.on("roomJoined", ({ players }) => {
      setPlayers(players);
      setStep("quiz");
    });

    socket.on("nextQuestion", (q) => setQuestion(q));

    socket.on("endQuiz", ({ winner, players }) => {
      setWinner(winner);
      setPlayers(players);
      setStep("result");
    });

    socket.on("errorRoom", (msg) => alert(msg));
  }, []);

  const handleCreateRoom = () => {
    socket.emit("createRoom", { name: players[0].name, theme });
  };

  const handleJoinRoom = () => {
    socket.emit("joinRoom", { name: players[1].name, roomCode: inputCode });
  };

  const submitAnswer = () => {
    socket.emit("submitAnswer", { roomCode, answer });
    setAnswer("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-indigo-50">
      {step === "register" && (
        <div className="grid grid-cols-2 gap-6">
          {players.map((p, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow">
              <h2 className="font-bold mb-2">Joueur {idx + 1}</h2>
              <input
                placeholder="Nom"
                value={p.name}
                onChange={(e) => {
                  const newPlayers = [...players];
                  newPlayers[idx].name = e.target.value;
                  setPlayers(newPlayers);
                }}
                className="border p-2 rounded w-full mb-2"
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
                className="border p-2 rounded w-full"
              />
            </div>
          ))}
        </div>
      )}

      {step === "register" && (
        <div className="mt-4">
          <label>Choisir un thème : </label>
          <select value={theme} onChange={(e) => setTheme(e.target.value)} className="border p-2 rounded ml-2">
            <option value="maths">Maths</option>
            <option value="physique">Physique</option>
            <option value="culture">Culture</option>
            <option value="logique">Logique</option>
          </select>
          <button onClick={handleCreateRoom} className="ml-4 px-4 py-2 bg-indigo-600 text-white rounded">Créer la salle</button>
        </div>
      )}

      {step === "waiting" && (
        <div className="mt-6 text-center">
          <p>Salle créée ! Code à partager avec le joueur 2 : <strong>{roomCode}</strong></p>
          <input placeholder="Code de la salle" value={inputCode} onChange={(e) => setInputCode(e.target.value)} className="border p-2 rounded mt-2"/>
          <button onClick={handleJoinRoom} className="ml-2 px-4 py-2 bg-green-600 text-white rounded">Rejoindre la salle</button>
        </div>
      )}

      {step === "quiz" && question && (
        <div className="bg-white p-6 rounded-xl shadow w-full max-w-md mt-6">
          <h2 className="font-bold mb-4">{question.q}</h2>
          <input value={answer} onChange={(e) => setAnswer(e.target.value)} className="border p-2 rounded w-full mb-2"/>
          <button onClick={submitAnswer} className="px-4 py-2 bg-indigo-600 text-white rounded w-full">Envoyer</button>
        </div>
      )}

      {step === "result" && winner && (
        <div className="mt-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Le vainqueur est {winner.name} ! 🎉</h2>
        </div>
      )}
    </div>
  );
}
