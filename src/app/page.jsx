"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="w-full overflow-x-hidden">
      {/* HERO SECTION */}
    <section className="relative h-screen flex items-center justify-center text-white">
  {/* Image de fond */}
  <Image
    src="/hero-bg.jpg" // place ton image dans /public/hero-bg.jpg
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
    <h1 className="text-5xl md:text-6xl font-bold mb-6">
      Bienvenue sur QuizApp
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

          <motion.div
            className="md:w-1/2"
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
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
          </motion.div>
        </div>
      </section>
    </main>
  );
}
