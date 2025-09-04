"use client"; // IMPORTANT : transforme ce composant en Client Component

import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Remplace next/router par next/navigation
import confetti from "canvas-confetti";
import Link from "next/link";

export default function ResultPage({ searchParams }) {
  const router = useRouter();

  const score = Number(searchParams?.score || 0);
  const winner = searchParams?.winner || "Aucun";

  useEffect(() => {
    if (score > 0) {
      confetti({
        particleCount: 200,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [score]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-indigo-50 via-purple-50 to-pink-50 p-6">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Résultat du quiz</h1>
      <p className="text-2xl mb-4">
        Score : <span className="font-extrabold">{score}/10</span>
      </p>
      <p className="text-xl mb-6">
        Vainqueur : <span className="font-semibold">{winner}</span>
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => router.push("/multiplayer")}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Rejouer
        </button>
        <Link
          href="/"
          className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
        >
          Accueil
        </Link>
      </div>
    </div>
  );
}
