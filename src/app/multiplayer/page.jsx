"use client";
import { useEffect, useState } from "react";
import io from "socket.io-client";

let socket;

export default function Multiplayer() {
  const [player, setPlayer] = useState({ name: "", password: "" });
  const [room, setRoom] = useState("");
  const [joined, setJoined] = useState(false);
  const [messages, setMessages] = useState([]);
  const [winner, setWinner] = useState("");

  useEffect(() => {
    socket = io();

    socket.on("players-update", (data) => {
      setMessages((prev) => [...prev, `${data.player} a rejoint la salle !`]);
    });

    socket.on("player-answer", (data) => {
      setMessages((prev) => [...prev, `${data.player} a répondu : ${data.answer}`]);
    });

    socket.on("game-finished", (data) => {
      setWinner(data.winner);
    });
  }, []);

  const joinRoom = () => {
    if (!player.name || !room) return alert("Nom et code de salle requis !");
    socket.emit("join-room", { room, player: player.name });
    setJoined(true);
  };

  const sendAnswer = (answer) => {
    socket.emit("answer", { room, player: player.name, answer });
  };

  const finishGame = () => {
    const winnerName = prompt("Qui est le vainqueur ?");
    socket.emit("finish", { room, winner: winnerName });
  };

  if (!joined) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-b from-indigo-50 via-purple-50 to-pink-50">
        <h1 className="text-3xl font-bold mb-6">Multijoueur - Inscription</h1>
        <input
          placeholder="Nom"
          className="mb-2 p-2 border rounded"
          value={player.name}
          onChange={(e) => setPlayer({ ...player, name: e.target.value })}
        />
        <input
          placeholder="Code de salle"
          className="mb-4 p-2 border rounded"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <button onClick={joinRoom} className="px-4 py-2 bg-indigo-600 text-white rounded">Rejoindre</button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Salle : {room}</h1>
      <button onClick={() => sendAnswer("A")} className="mr-2 px-4 py-2 bg-blue-500 text-white rounded">Répondre A</button>
      <button onClick={() => sendAnswer("B")} className="mr-2 px-4 py-2 bg-green-500 text-white rounded">Répondre B</button>
      <button onClick={finishGame} className="px-4 py-2 bg-red-500 text-white rounded">Terminer</button>

      <div className="mt-4 border p-4 bg-white rounded shadow max-w-md">
        <h2 className="font-semibold mb-2">Messages :</h2>
        {messages.map((m, i) => <p key={i}>{m}</p>)}
      </div>

      {winner && <h2 className="mt-4 text-xl font-bold text-green-600">Vainqueur : {winner}</h2>}
    </div>
  );
}
