"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, Trophy, Users, Zap, BookOpen, Target, Award } from "lucide-react";

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
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl blur-xl opacity-75 animate-pulse"></div>
             
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
              Bienvenue sur <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">BurgerQuiz</span>
            </h1>
            <p className="text-lg md:text-2xl mb-8 text-gray-100 font-light">
              Testez vos connaissances et amusez-vous en apprenant !
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/quiz"
                className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl shadow-2xl hover:shadow-purple-500/50 transition-all hover:scale-105"
              >
                <Zap className="w-5 h-5" />
                Commencer le Quiz
                <span className="absolute inset-0 rounded-xl bg-white opacity-0 group-hover:opacity-20 transition"></span>
              </Link>
              <Link
                href="/multiplayer"
                className="group relative inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 font-bold rounded-xl shadow-2xl hover:shadow-white/50 transition-all hover:scale-105"
              >
                <Users className="w-5 h-5" />
                Mode Multijoueur
              </Link>
            </div>
          </motion.div>
        </section>
      </main>


      {/* ABOUT / ADVANTAGES SECTION */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Décoration de fond */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-5xl font-extrabold text-gray-900 mb-4">
              Pourquoi choisir <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">BurgerQuiz</span> ?
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Une plateforme complète pour tester et améliorer vos connaissances
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Sparkles,
                title: "Apprentissage Ludique",
                description: "Apprenez tout en vous amusant grâce à des quiz interactifs et captivants.",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                icon: Trophy,
                title: "Suivi de vos scores",
                description: "Gardez un historique de vos meilleurs scores et suivez votre progression.",
                gradient: "from-yellow-500 to-orange-500"
              },
              {
                icon: Target,
                title: "Accessible partout",
                description: "Utilisez BurgerQuiz sur votre ordinateur, tablette ou smartphone.",
                gradient: "from-blue-500 to-cyan-500"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className="group relative bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all"
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 rounded-3xl transition"></div>
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-6 shadow-lg`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED QUIZ SECTION */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h2
            className="text-5xl font-extrabold mb-4 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Nos quiz populaires
          </motion.h2>
          <motion.p
            className="text-gray-600 text-lg mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Choisissez votre thème préféré et commencez à apprendre
          </motion.p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Géographie", icon: "🌍", gradient: "from-green-500 to-emerald-600", description: "Explorez le monde" },
              { name: "Maths", icon: "🔢", gradient: "from-blue-500 to-indigo-600", description: "Résolvez des énigmes" },
              { name: "Culture Générale", icon: "📚", gradient: "from-purple-500 to-pink-600", description: "Enrichissez vos connaissances" }
            ].map((cat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group relative overflow-hidden rounded-3xl shadow-xl cursor-pointer"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-90 group-hover:opacity-100 transition`}></div>
                <div className="relative p-10 text-white">
                  <div className="text-6xl mb-4">{cat.icon}</div>
                  <h3 className="text-2xl font-bold mb-2">{cat.name}</h3>
                  <p className="text-white/90 mb-6">{cat.description}</p>
                  <div className="inline-flex items-center gap-2 text-sm font-semibold">
                    <span>Commencer</span>
                    <Zap className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12"
          >
            <Link
              href="/quiz"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all"
            >
              <BookOpen className="w-5 h-5" />
              Voir tous les quiz
            </Link>
          </motion.div>
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
     
    </main>
  );
}
