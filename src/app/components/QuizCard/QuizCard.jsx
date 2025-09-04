"use client";
import { useState } from "react";

export default function QuizCard({ questionData, onAnswer }) {
  const [selected, setSelected] = useState(null);

  const handleNext = () => {
    if (selected !== null) {
      onAnswer(selected);
      setSelected(null);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">{questionData.question}</h2>
      <div className="space-y-3">
        {questionData.options.map((opt, idx) => (
          <button
            key={idx}
            className={`w-full text-left px-4 py-2 rounded-lg border ${
              selected === idx ? "bg-blue-500 text-white" : "bg-gray-100"
            }`}
            onClick={() => setSelected(idx)}
          >
            {opt}
          </button>
        ))}
      </div>
      <button
        onClick={handleNext}
        className="mt-5 bg-green-500 text-white px-4 py-2 rounded-lg w-full disabled:bg-gray-300"
        disabled={selected === null}
      >
        Suivant
      </button>
    </div>
  );
}
