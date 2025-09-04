export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-gray-300 py-8 mt-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo / Nom du site */}
        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold text-white">QuizSphere</h2>
          <p className="text-sm mt-1">© {new Date().getFullYear()} - Tous droits réservés</p>
        </div>

        {/* Liens rapides */}
        <ul className="flex gap-6 text-gray-300">
          <li>
            <a href="/" className="hover:text-yellow-400 transition">Accueil</a>
          </li>
          <li>
            <a href="/quiz" className="hover:text-yellow-400 transition">Quiz</a>
          </li>
          <li>
            <a href="/history" className="hover:text-yellow-400 transition">Historique</a>
          </li>
          <li>
            <a href="/profile" className="hover:text-yellow-400 transition">Profile</a>
          </li>
        </ul>

        {/* Mention technique */}
        <div className="text-center md:text-right text-sm text-gray-400">
          Créé avec Next.js & Tailwind CSS
        </div>
      </div>
    </footer>
  );
}
