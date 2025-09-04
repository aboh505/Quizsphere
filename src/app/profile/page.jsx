"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";

export default function ProfilePage() {
  // --------- États ----------
  const [profile, setProfile] = useState({ name: "Invité", avatar: "" });
  const [scores, setScores] = useState([]); // [{ score, theme, date }]
  const [editing, setEditing] = useState(false);
  const [tempName, setTempName] = useState("");
  const [tempAvatar, setTempAvatar] = useState("");

  // --------- Chargement localStorage ----------
  useEffect(() => {
    try {
      const storedProfile = JSON.parse(localStorage.getItem("profile"));
      if (storedProfile?.name) setProfile(storedProfile);

      const storedScores = JSON.parse(localStorage.getItem("scores"));
      if (Array.isArray(storedScores)) setScores(storedScores);
    } catch {
      // si parsing échoue, on ignore
    }
  }, []);

    const deleteQuiz = (date) => {
    const updated = scores.filter((s) => s.date !== date);
    setScores(updated);
    localStorage.setItem("scores", JSON.stringify(updated));
  };

  // --------- Dérivés / Statistiques ----------
  const totalQuizzes = scores.length;

  // moyenne en % si les quiz font 10 questions (ajuste si besoin)
  const averagePercent = useMemo(() => {
    if (!scores.length) return 0;
    const total = scores.reduce((sum, s) => sum + (Number(s.score) || 0), 0);
    return Math.round((total / (scores.length * 10)) * 100);
  }, [scores]);

  const bestByTheme = useMemo(() => {
    const out = {};
    for (const s of scores) {
      if (!s?.theme) continue;
      const val = Number(s.score) || 0;
      out[s.theme] = Math.max(out[s.theme] ?? 0, val);
    }
    return out;
  }, [scores]);

  const recent = useMemo(() => {
    return scores.slice(-5).reverse();
  }, [scores]);

  // --------- Édition Profil ----------
  const openEdit = () => {
    setTempName(profile.name || "Invité");
    setTempAvatar(profile.avatar || "");
    setEditing(true);
  };

  const onSelectAvatar = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setTempAvatar(String(e.target?.result || ""));
    };
    reader.readAsDataURL(file);
  };

  const saveProfile = () => {
    const next = { name: (tempName || "Invité").trim(), avatar: tempAvatar || "" };
    setProfile(next);
    localStorage.setItem("profile", JSON.stringify(next));
    setEditing(false);
  };

  const resetProfile = () => {
    const next = { name: "Invité", avatar: "" };
    setProfile(next);
    localStorage.setItem("profile", JSON.stringify(next));
  };

  // --------- UI ----------
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-purple-50 to-pink-50">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row items-center gap-8"
          >
            <div className="relative">
              {profile.avatar ? (
                <img
                  src={profile.avatar}
                  alt="Avatar"
                  className="w-36 h-36 md:w-40 md:h-40 rounded-2xl object-cover shadow-lg ring-4 ring-white/70"
                />
              ) : (
                <div className="w-36 h-36 md:w-40 md:h-40 rounded-2xl bg-gradient-to-br from-indigo-200 to-purple-200 grid place-content-center text-4xl font-bold text-indigo-700 shadow-lg ring-4 ring-white/70">
                  {profile.name?.[0]?.toUpperCase() || "I"}
                </div>
              )}
            </div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
                Bonjour, <span className="bg-gradient-to-r from-indigo-600 to-fuchsia-600 bg-clip-text text-transparent">{profile.name || "Invité"}</span> ✨
              </h1>
              <p className="mt-2 text-gray-600">
                Voici ton espace personnel : paramètres, statistiques et derniers quiz.
              </p>

              <div className="mt-5 flex items-center justify-center md:justify-start gap-3">
                <button
                  onClick={openEdit}
                  className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition shadow"
                >
                  Modifier le profil
                </button>
                <button
                  onClick={resetProfile}
                  className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition"
                >
                  Réinitialiser
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stat Cards */}
      <section className="max-w-6xl mx-auto px-6 py-4 md:py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <StatCard title="Quiz complétés" value={totalQuizzes} subtitle="Total des parties jouées" />
          <StatCard title="Moyenne" value={`${averagePercent}%`} subtitle="Sur la base de 10 questions/quiz" />
          <StatCard title="Meilleur score global" value={`${Math.max(0, ...scores.map(s => Number(s.score) || 0))}/10`} subtitle="Sur l’ensemble des thèmes" />
        </div>
      </section>

      {/* Best by Theme */}
      <section className="max-w-6xl mx-auto px-6 py-6 md:py-10">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Meilleur score par thème</h2>
        {Object.keys(bestByTheme).length === 0 ? (
          <EmptyState text="Aucun score encore enregistré. Lance un premier quiz !" />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(bestByTheme).map(([theme, best]) => (
              <motion.div
                key={theme}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35 }}
                className="rounded-2xl p-5 bg-white shadow hover:shadow-lg transition"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold uppercase tracking-wide text-indigo-600">{theme}</span>
                  <span className="text-xs text-gray-500">max</span>
                </div>
                <div className="mt-2 flex items-end justify-between">
                  <p className="text-3xl font-extrabold text-gray-900">{best}/10</p>
                  <div className="w-28 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-fuchsia-500"
                      style={{ width: `${Math.min(100, (Number(best) || 0) * 10)}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Recent Quizzes */}
      <section className="max-w-6xl mx-auto px-6 py-6 md:py-10">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Quiz récents</h2>
        {recent.length === 0 ? (
          <EmptyState text="Tu n’as pas encore de quiz récent." />
        ) : (
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow">
            <div className="grid grid-cols-8 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
              <div className="col-span-5">Thème</div>
              <div className="col-span-3">Score</div>
              <div className="col-span-4">Date</div>
            </div>
            <ul className="divide-y divide-gray-100">
              {recent.map((r, idx) => (
                <li key={idx} className="grid grid-cols-12 px-5 py-4 hover:bg-gray-50">
                  <div className="col-span-5 font-medium text-gray-800">{r.theme || "—"}</div>
                  <div className="col-span-3">
                    <span className="inline-flex items-center gap-2">
                      <span className="text-gray-900 font-semibold">{r.score}/10</span>
                      <span className="text-xs text-gray-500">
                        ({Math.round(((Number(r.score) || 0) / 10) * 100)}%)
                      </span>
                    </span>
                  </div>
                     <div className="col-span-1 flex justify-end">
                    <button
                      onClick={() => deleteQuiz(r.date)}
                      className="text-red-500 hover:text-red-700 transition"
                      title="Supprimer"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <div className="col-span-4 text-gray-600 text-sm">{r.date || "—"}</div>
                  
                
                </li>
                
              ))}
              
            </ul>
                
          </div>
        )}
      </section>

      {/* Modal d'édition */}
      {editing && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm grid place-items-center p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl p-6">
            <h3 className="text-xl font-bold text-gray-900">Modifier le profil</h3>
            <p className="text-sm text-gray-500 mt-1">Mets à jour ton nom et ton avatar. Les modifications sont stockées sur cet appareil.</p>

            <div className="mt-5 flex items-center gap-4">
              {tempAvatar ? (
                <img src={tempAvatar} alt="Aperçu avatar" className="w-20 h-20 rounded-xl object-cover ring-2 ring-indigo-200" />
              ) : (
                <div className="w-20 h-20 rounded-xl bg-indigo-100 grid place-content-center text-indigo-700 font-bold">
                  {tempName?.[0]?.toUpperCase() || "I"}
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700">Nom</label>
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="mt-1 w-full md:w-72 rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Ton nom"
                />
                <label className="block text-sm font-medium text-gray-700 mt-3">Avatar</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => onSelectAvatar(e.target.files?.[0])}
                  className="mt-1 block w-full text-sm text-gray-600 file:mr-4 file:rounded-lg file:border-0 file:bg-indigo-600 file:px-4 file:py-2 file:text-white hover:file:bg-indigo-700"
                />
                <p className="text-xs text-gray-400 mt-1">JPEG/PNG, stocké localement (base64).</p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={() => setEditing(false)}
                className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition"
              >
                Annuler
              </button>
              <button
                onClick={saveProfile}
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* --------- Composants UI --------- */

function StatCard({ title, value, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className="rounded-2xl p-5 bg-white shadow hover:shadow-lg transition"
    >
      <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">{title}</p>
      <p className="mt-1 text-3xl font-extrabold text-gray-900">{value}</p>
      {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
    </motion.div>
  );
}

function EmptyState({ text }) {
  return (
    <div className="rounded-2xl border border-dashed border-gray-300 p-8 text-center bg-white/60">
      <p className="text-gray-600">{text}</p>
    </div>
  );
}
