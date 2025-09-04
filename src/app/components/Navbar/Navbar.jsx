"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Accueil", path: "/" },
    { name: "À propos", path: "/about" },
    { name: "Quiz", path: "/multiquiz" },
    { name: "Multijoueur", path: "/multiplayer" },
  ];

  return (
    <nav className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-gray-300 py-5  shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-extrabold tracking-tight hover:text-white transition">
          BurgerQuiz
        </Link>
        <ul className="flex gap-8">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                href={link.path}
                className={`
                  relative px-2 py-1 font-medium text-white-900
                  hover:text-white transition
                  ${pathname === link.path ? "after:absolute after:-bottom-1 after:left-0 after:w-full after:h-1 after:bg-white after:rounded-full" : ""}
                `}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
