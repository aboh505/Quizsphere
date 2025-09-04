"use client";
import { motion } from "framer-motion";

export default function About() {
  const tips = [
    "Lisez attentivement chaque question avant de répondre.",
    "Ne vous précipitez pas, prenez le temps de réfléchir.",
    "Revoyez vos réponses avant de passer à la suivante.",
    "Essayez de terminer un thème complet pour mieux mémoriser.",
    "Amusez-vous tout en apprenant !",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-purple-100 to-pink-100">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-6">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6"
        >
          À propos de QuizApp
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="text-lg md:text-2xl text-gray-700 max-w-3xl"
        >
          QuizApp est une plateforme interactive qui vous permet de tester vos connaissances tout en vous amusant. Suivez nos conseils pour améliorer vos scores et progresser rapidement !
        </motion.p>
      </section>

      {/* Tutoriels / Conseils */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Conseils pour réussir vos quiz</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {tips.map((tip, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transition-transform"
            >
              <p className="text-gray-800 font-medium">{tip}</p>
            </motion.div>
          ))}
        </div>
        {/* ABOUT / ADVANTAGES SECTION */}
<section className="py-20 bg-blue-600 mt-10">
  <div className="max-w-6xl mx-auto px-6 text-center">
    <motion.h2
      className="text-4xl font-bold mb-12"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      Pourquoi choisir QuizApp ?
    </motion.h2>

    <div className="grid md:grid-cols-3 gap-10">
      <motion.div
        className="bg-white p-8 rounded-2xl shadow hover:scale-105 transition-transform"
        whileHover={{ scale: 1.05 }}
      >
        <h3 className="text-xl font-semibold mb-3">Apprentissage Ludique</h3>
        <p>Apprenez tout en vous amusant grâce à des quiz interactifs.</p>
      </motion.div>

      <motion.div
        className="bg-white p-8 rounded-2xl shadow hover:scale-105 transition-transform"
        whileHover={{ scale: 1.05 }}
      >
        <h3 className="text-xl font-semibold mb-3">Suivi de vos scores</h3>
        <p>Gardez un historique de vos meilleurs scores et progressez.</p>
      </motion.div>

      <motion.div
        className="bg-white p-8 rounded-2xl shadow hover:scale-105 transition-transform"
        whileHover={{ scale: 1.05 }}
      >
        <h3 className="text-xl font-semibold mb-3">Accessible partout</h3>
        <p>Utilisez QuizApp sur votre ordinateur ou smartphone, partout.</p>
      </motion.div>
    </div>
  </div>
</section>

      </section>

      {/* Progression / Infographie */}
      <section className="py-16 px-10 bg-white rounded-t-3xl shadow-inner">
        <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Votre progression</h2>
        <div className="max-w-4xl mx-auto">
          {["Géographie", "Maths", "Histoire", "Sciences"].map((theme, index) => (
            <motion.div
              key={index}
              initial={{ width: 0 }}
              whileInView={{ width: `${(Math.random() * 70 + 30).toFixed(0)}%` }} // exemple random progression
              viewport={{ once: true }}
              transition={{ duration: 1 + index * 0.3 }}
              className="mb-6 bg-gray-200 rounded-full h-6"
            >
              <div className="bg-blue-500 h-6 rounded-full text-white text-sm flex items-center justify-end pr-3 font-semibold">
                {theme}
              </div>
            </motion.div>
          ))}
        </div>
        <p className="mt-4 text-center text-gray-600 italic">Les barres représentent votre progression approximative sur chaque thème.</p>
      </section>
    </div>
  );
}
