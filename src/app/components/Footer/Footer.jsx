import Link from "next/link";
import { Heart, Mail, Github, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-gray-300 relative overflow-hidden">
      {/* Décoration de fond */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Logo et Description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-xl font-bold text-2xl shadow-lg">
                🍔
              </div>
              <h2 className="text-3xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
                BurgerQuiz
              </h2>
            </div>
            <p className="text-gray-400 mb-4 leading-relaxed">
              Testez vos connaissances et amusez-vous en apprenant avec des quiz interactifs sur des thèmes variés. Jouez seul ou défiez vos amis en mode multijoueur !
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="text-white font-bold mb-4 text-lg">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-purple-400 transition flex items-center gap-2">
                  <span className="text-purple-400">•</span> Accueil
                </Link>
              </li>
              <li>
                <Link href="/quiz" className="text-gray-400 hover:text-purple-400 transition flex items-center gap-2">
                  <span className="text-purple-400">•</span> Quiz Solo
                </Link>
              </li>
              <li>
                <Link href="/multiplayer" className="text-gray-400 hover:text-purple-400 transition flex items-center gap-2">
                  <span className="text-purple-400">•</span> Multijoueur
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-gray-400 hover:text-purple-400 transition flex items-center gap-2">
                  <span className="text-purple-400">•</span> Mon Profil
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-4 text-lg">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-gray-400">
                <Mail className="w-4 h-4 text-purple-400" />
                contact@burgerquiz.com
              </li>
              <li className="text-gray-400 text-sm mt-4">
                <span className="block font-semibold text-white mb-1">Technologies</span>
                Next.js, React, Tailwind CSS, Socket.io
              </li>
            </ul>
          </div>
        </div>

        {/* Barre de séparation */}
        <div className="border-t border-gray-700 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} BurgerQuiz. Tous droits réservés.
            </p>
            <p className="text-gray-400 text-sm flex items-center gap-1">
              Fait avec <Heart className="w-4 h-4 text-red-500 fill-red-500" /> par l'équipe BurgerQuiz
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
