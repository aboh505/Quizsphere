"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="w-full overflow-x-hidden">
      {/* HERO SECTION */}
   <main className="w-full overflow-x-hidden">
  {/* HERO SECTION */}
  <section className="relative h-[70vh] flex items-center justify-center text-white">
    {/* Image de fond */}
    <Image
      src="/a1.jpg" // place ton image dans /public/
      alt="Hero Background"
      fill
      className="object-cover absolute inset-0 -z-10 brightness-75"
    />

    {/* Contenu du Hero */}
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
      className="text-center px-6 max-w-3xl"
    >
      <h1 className="text-5xl md:text-5xl font-bold mb-6">
        Bienvenue sur BurgerQuiz
      </h1>
      <p className="text-lg md:text-2xl mb-6">
        Testez vos connaissances et amusez-vous en apprenant !
      </p>
      <Link
        href="/multiquiz"
        className="inline-block px-8 py-4 bg-yellow-400 text-gray-900 font-semibold rounded-xl shadow-lg hover:bg-yellow-300 transition"
      >
        Commencer le Quiz
      </Link>
    </motion.div>
  </section>
</main>


      {/* ABOUT / ADVANTAGES SECTION */}
      <section className="py-20 bg-gray-50">
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

      {/* FEATURED QUIZ SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h2
            className="text-4xl font-bold mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            Nos quiz populaires
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-10">
            {["Géographie", "Maths", "Culture Générale"].map((cat, i) => (
              <motion.div
                key={i}
                className="bg-blue-600 text-white p-8 rounded-2xl shadow hover:scale-105 transition-transform cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="text-2xl font-semibold mb-3">{cat}</h3>
                <p>Essayez notre quiz sur {cat} et améliorez vos connaissances !</p>
              </motion.div>
            ))}
          </div>

          {/* <Link
            href="/quiz"
            className="mt-12 inline-block px-8 py-4 bg-yellow-400 text-gray-900 font-semibold rounded-xl shadow-lg hover:bg-yellow-300 transition"
          >
            Voir tous les quiz
          </Link> */}
        </div>
      </section>
       <section className="py-24 px-6 bg-gray-100 text-gray-800">
        <h2 className="text-4xl font-bold text-center mb-12">Ce que disent nos utilisateurs</h2>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <p>"Une expérience super amusante et éducative ! J’adore les quiz rapides."</p>
            <h4 className="mt-4 font-bold">- Alice</h4>
          </div>
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <p>"Les scores et les classements me motivent à m’améliorer chaque jour."</p>
            <h4 className="mt-4 font-bold">- Julien</h4>
          </div>
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <p>"Beaucoup de thèmes intéressants, parfait pour apprendre tout en s’amusant."</p>
            <h4 className="mt-4 font-bold">- Sofia</h4>
          </div>
        </div>
      </section>

      {/* CONTACT / NEWSLETTER SECTION */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
          <motion.div
            className="md:w-1/2 relative h-64 md:h-96 rounded-2xl overflow-hidden shadow-lg"
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <Image
              src="/logo.jpg" // /public/contact-illustration.jpg
              alt="Contact illustration"
              fill
              className="object-cover"
            />
          </motion.div>

         
            
            <h2 className="text-4xl font-bold mb-6">Restez en contact</h2>
            <p className="mb-6 text-gray-700">
              Posez vos questions ou abonnez-vous à notre newsletter pour ne rien manquer.
            </p>
            <form className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Votre email"
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                S'abonner
              </button>
            </form>
          
        </div>
      </section>
    </main>
  );
}
