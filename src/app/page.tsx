"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { LevelEmoji } from "@/components/LevelEmoji";
import { LevelBinary } from "@/components/LevelBinary";
import { LevelCaesar } from "@/components/LevelCaesar";
import { SecretLab } from "@/components/SecretLab";
import { StoryIntroModal } from "@/components/StoryIntroModal";
import { CertificateModal } from "@/components/CertificateModal";
import { Confetti } from "@/components/Confetti";
import { playSuccess } from "@/lib/sound";
import { Award, Compass, Sparkles, BookOpen, Heart } from "lucide-react";

export default function GamePage() {
  const [currentTab, setCurrentTab] = useState<"emoji" | "binary" | "caesar" | "lab">("emoji");
  const [stars, setStars] = useState(0);
  const [confettiActive, setConfettiActive] = useState(false);
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Load stars and check first visit from localStorage
  useEffect(() => {
    try {
      const savedStars = localStorage.getItem("detektif_kode_stars");
      if (savedStars) {
        setStars(parseInt(savedStars, 10) || 0);
      }

      const hasVisited = localStorage.getItem("detektif_kode_visited");
      if (!hasVisited) {
        setIsTutorialOpen(true);
        localStorage.setItem("detektif_kode_visited", "true");
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  const handleEarnStar = () => {
    setStars((prev) => {
      const next = prev + 1;
      try {
        localStorage.setItem("detektif_kode_stars", next.toString());
      } catch {
        // ignore
      }
      return next;
    });
  };

  const triggerConfetti = () => {
    setConfettiActive(true);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Particle Confetti Component */}
      <Confetti active={confettiActive} onComplete={() => setConfettiActive(false)} />

      {/* Top Navigation */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        stars={stars}
        onOpenTutorial={() => setIsTutorialOpen(true)}
        onOpenCertificate={() => setIsCertificateOpen(true)}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
      />

      {/* Main Container */}
      <main className="max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 flex-1">
        {/* Active Game Level View */}
        {currentTab === "emoji" && (
          <LevelEmoji onEarnStar={handleEarnStar} onTriggerConfetti={triggerConfetti} />
        )}

        {currentTab === "binary" && (
          <LevelBinary onEarnStar={handleEarnStar} onTriggerConfetti={triggerConfetti} />
        )}

        {currentTab === "caesar" && (
          <LevelCaesar onEarnStar={handleEarnStar} onTriggerConfetti={triggerConfetti} />
        )}

        {currentTab === "lab" && <SecretLab />}
      </main>

      {/* Educational Summary Cards Section */}
      <section className="bg-slate-950/60 border-t border-indigo-500/20 py-8 px-4 sm:px-6 mt-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6">
            <h3 className="text-lg font-black text-yellow-300 flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <span>Rangkuman Konsep Detektif Cilik</span>
            </h3>
            <p className="text-xs text-indigo-200">
              Konsep penting ilmu komputer yang kamu pelajari hari ini!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-900/80 border border-purple-500/30 rounded-2xl p-4">
              <div className="text-2xl mb-1">🔐 1. ENCODING</div>
              <h4 className="font-bold text-sm text-purple-300">Pesan ➡️ Kode Rahasia</h4>
              <p className="text-xs text-slate-300 mt-1">
                Mengubah informasi dari bentuk yang dimengerti manusia (seperti kata atau gambar) ke format kode yang bisa disimpan atau dikirim secara aman.
              </p>
            </div>

            <div className="bg-slate-900/80 border border-cyan-500/30 rounded-2xl p-4">
              <div className="text-2xl mb-1">🔓 2. DECODING</div>
              <h4 className="font-bold text-sm text-cyan-300">Kode Rahasia ➡️ Pesan</h4>
              <p className="text-xs text-slate-300 mt-1">
                Menerjemahkan kembali kode atau sinyal yang diterima menjadi pesan yang bisa dimengerti kembali menggunakan kamus kunci (Cipher).
              </p>
            </div>

            <div className="bg-slate-900/80 border border-amber-500/30 rounded-2xl p-4">
              <div className="text-2xl mb-1">💡 3. BINER &amp; KOMPUTER</div>
              <h4 className="font-bold text-sm text-yellow-300">Bahasa 0 dan 1</h4>
              <p className="text-xs text-slate-300 mt-1">
                Di dalam komputer tidak ada huruf, hanya ada jutaan saklar listrik: 0 (Mati) dan 1 (Nyala). Semua chat, video game, dan musik di-encode jadi biner!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 py-4 px-4 text-center text-xs">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="flex items-center gap-1 justify-center">
            <span>Dibuat dengan</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>untuk anak-anak belajar konsep sains komputer secara visual &amp; menyenangkan.</span>
          </p>
          <p className="text-indigo-400 font-medium">
            Next.js • Tailwind CSS • Web Audio API
          </p>
        </div>
      </footer>

      {/* Modals */}
      <StoryIntroModal isOpen={isTutorialOpen} onClose={() => setIsTutorialOpen(false)} />
      <CertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        stars={stars}
      />
    </div>
  );
}

