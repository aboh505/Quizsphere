export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-gray-300 py-18 ">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo / Nom du site */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-extrabold tracking-tight italic bg-gradient-to-r from-red-500 via-orange-500 via-yellow-400 via-green-500 via-blue-500 via-indigo-500 via-purple-500 bg-clip-text text-transparent animate-gradient-x transition hover:brightness-110">BurgerQuiz</h2>
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
            <a href="/multiplayer" className="hover:text-yellow-400 transition">Multijoueur</a>
          </li>

           <li>
            <a href="/multiquiz" className="hover:text-yellow-400 transition">Multiquiz</a>
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
