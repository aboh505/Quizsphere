"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Accueil", path: "/" },
    { name: "Quiz", path: "/quiz" },
    { name: "Multijoueur", path: "/multiplayer" },
  ];

  return (
    <nav className="bg-white py-5 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
         className="text-2xl font-bold tracking-tight italic bg-gradient-to-r from-red-500 via-orange-500 via-yellow-400 via-green-500 via-blue-500 via-indigo-500 via-purple-500 bg-clip-text text-transparent animate-gradient-x transition hover:brightness-110">
          BurgerQuiz
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                href={link.path}
                className={`
                  relative px-2 py-1 font-medium text-black
                  hover:text-gray-700 transition
                  ${pathname === link.path ? "after:absolute after:-bottom-1 after:left-0 after:w-full after:h-1 after:bg-black after:rounded-full" : ""}
                `}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex items-center justify-center p-2 rounded-md hover:bg-gray-200 transition"
        >
          <svg
            className="w-6 h-6 text-black"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden flex flex-col bg-white text-black px-6 py-4 space-y-3 shadow-md">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                href={link.path}
                className={`
                  block px-2 py-1 font-medium rounded hover:bg-gray-200 transition
                  ${pathname === link.path ? "bg-gray-100" : ""}
                `}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
