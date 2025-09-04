"use client";
import { useEffect, useState } from "react";
import io from "socket.io-client";

let socket;

export default function MultiplayerPage() {
  const [name, setName] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [theme, setTheme] = useState("Maths");
  const [joined, setJoined] = useState(false);
  const [players, setPlayers] = useState({});
  const [questionIndex, setQuestionIndex] = useState(0);

  useEffect(() => {
    socket = io(); // se connecte automatiquement au serveur

    socket.on("room-created", ({ roomCode }) => {
      setRoomCode(roomCode);
      setJoined(true);
    });

    socket.on("players-update", (players) => setPlayers(players));
    socket.on("update", ({ players, questionIndex }) => {
      setPlayers(players);
      setQuestionIndex(questionIndex);
    });

    return () => socket.disconnect();
  }, []);

  const createRoom = () => {
    socket.emit("create-room", { playerName: name, theme });
  };

  const joinRoom = () => {
    socket.emit("join-room", { roomCode, playerName: name });
    setJoined(true);
  };

  const submitAnswer = (correct) => {
    socket.emit("submit-answer", { roomCode, correct });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-indigo-50 via-purple-50 to-pink-50">
      {!joined ? (
        <div className="flex gap-8">
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold mb-2">Créer une salle</h2>
            <input placeholder="Ton nom" value={name} onChange={e=>setName(e.target.value)} className="border p-2 rounded mb-2 w-full"/>
            <select value={theme} onChange={e=>setTheme(e.target.value)} className="border p-2 rounded w-full mb-2">
              <option>Maths</option>
              <option>Histoire</option>
              <option>Géographie</option>
            </select>
            <button onClick={createRoom} className="bg-indigo-600 text-white px-4 py-2 rounded">Créer</button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold mb-2">Rejoindre une salle</h2>
            <input placeholder="Ton nom" value={name} onChange={e=>setName(e.target.value)} className="border p-2 rounded mb-2 w-full"/>
            <input placeholder="Code de la salle" value={roomCode} onChange={e=>setRoomCode(e.target.value)} className="border p-2 rounded mb-2 w-full"/>
            <button onClick={joinRoom} className="bg-green-600 text-white px-4 py-2 rounded">Rejoindre</button>
          </div>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-xl shadow w-full max-w-lg">
          <h2 className="text-xl font-bold mb-2">Thème: {theme}</h2>
          <p>Question #{questionIndex + 1}</p>
          <div className="flex gap-4 mt-2">
            <button onClick={()=>submitAnswer(true)} className="bg-indigo-600 text-white px-4 py-2 rounded">Correct</button>
            <button onClick={()=>submitAnswer(false)} className="bg-red-600 text-white px-4 py-2 rounded">Incorrect</button>
          </div>
          <div className="mt-4">
            <h3>Scores:</h3>
            {Object.values(players).map((p,i)=>(
              <p key={i}>{p.name}: {p.score}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
