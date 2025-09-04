"use client";
import { useState, useEffect } from "react";

export default function History() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("scores")) || [];
    setScores(stored);
  }, []);

  // Calcul du meilleur et du pire score
  const bestScore = scores.length ? Math.max(...scores.map(s => s.score)) : null;
  const worstScore = scores.length ? Math.min(...scores.map(s => s.score)) : null;

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 p-6 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-gray-800">Historique des Scores</h1>

      {scores.length === 0 ? (
        <p className="text-lg text-gray-700 bg-white px-6 py-4 rounded-xl shadow-md">
          Aucun score enregistré.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
          {scores.map((item, index) => (
            <div
              key={index}
              className={`bg-white p-6 rounded-2xl shadow-lg border-l-8 
                ${item.score === bestScore ? "border-green-500" : item.score === worstScore ? "border-red-500" : "border-blue-500"}
                hover:scale-105 transition-transform`}
            >
              <p className="text-xl font-semibold text-gray-800">Score : {item.score}</p>
              <p className="text-gray-500 mt-2">Thème : {item.theme || "N/A"}</p>
              <p className="text-gray-400 mt-1 text-sm">{item.date}</p>
            </div>
          ))}
        </div>
      )}

      {scores.length > 0 && (
        <div className="mt-8 flex gap-4">
          <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-semibold shadow">
            Meilleur score : {bestScore}
          </div>
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg font-semibold shadow">
            Pire score : {worstScore}
          </div>
        </div>
      )}
    </div>
  );
}
