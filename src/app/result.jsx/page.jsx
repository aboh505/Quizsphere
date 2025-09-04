import { useEffect } from "react";
import { useRouter } from "next/router";
import confetti from "canvas-confetti";
import Link from "next/link";

export default function Result() {
  const router = useRouter();
  const { score } = router.query;

  useEffect(() => {
    if (score) {
      const scores = JSON.parse(localStorage.getItem("quizScores") || "[]");
      scores.push({ score: Number(score), date: new Date().toLocaleString() });
      localStorage.setItem("quizScores", JSON.stringify(scores));
      if (Number(score) > 0) {
        confetti();
      }
    }
  }, [score]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">Résultat du quiz</h1>
      <p className="text-xl mb-6">Votre score : {score}</p>
      <Link href="/quiz" className="bg-blue-500 text-white px-6 py-3 rounded-lg">
        Rejouer
      </Link>
      <Link href="/history" className="mt-4 text-blue-600 underline">
        Voir l’historique
      </Link>
    </main>
  );
}
