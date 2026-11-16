"use client";

import React from "react";
import { Sparkles, HelpCircle, Trophy, Volume2, VolumeX, ShieldCheck } from "lucide-react";
import { playPop } from "@/lib/sound";

interface NavbarProps {
  currentTab: "emoji" | "binary" | "caesar" | "lab";
  onSelectTab: (tab: "emoji" | "binary" | "caesar" | "lab") => void;
  stars: number;
  onOpenTutorial: () => void;
  onOpenCertificate: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  stars,
  onOpenTutorial,
  onOpenCertificate,
  soundEnabled,
  onToggleSound,
}) => {
  const tabs = [
    { id: "emoji" as const, label: "Level 1: Sandi Emoji", icon: "🐱🍎" },
    { id: "binary" as const, label: "Level 2: Lampu Biner", icon: "💡🤖" },
    { id: "caesar" as const, label: "Level 3: Sandi Geser", icon: "🎡🗝️" },
    { id: "lab" as const, label: "Laboratorium Bebas", icon: "🧪✨" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-indigo-500/30 px-3 py-2.5 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Brand / Title */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <div className="flex items-center gap-2.5">
            <span className="text-3xl animate-bounce">🕵️‍♂️</span>
            <div>
              <h1 className="text-lg sm:text-xl font-extrabold tracking-tight bg-gradient-to-r from-yellow-300 via-pink-400 to-cyan-300 bg-clip-text text-transparent">
                Detektif Kode Rahasia
              </h1>
              <p className="text-xs text-indigo-200 font-medium hidden sm:block">
                Petualangan Belajar Encoding &amp; Decoding untuk Anak
              </p>
            </div>
          </div>

          {/* Quick buttons on mobile */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => {
                playPop();
                onOpenCertificate();
              }}
              className="flex items-center gap-1 bg-amber-500/20 text-yellow-300 border border-yellow-500/40 px-2 py-1 rounded-full text-xs font-bold"
            >
              ⭐ {stars}
            </button>
            <button
              onClick={() => {
                playPop();
                onOpenTutorial();
              }}
              className="p-1.5 bg-indigo-600/40 hover:bg-indigo-600 text-indigo-200 rounded-full"
              title="Bantuan & Panduan"
            >
              <HelpCircle className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Level Navigation Tabs */}
        <nav className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          {tabs.map((tab) => {
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  playPop();
                  onSelectTab(tab.id);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 whitespace-nowrap cursor-pointer shadow-sm ${
                  isActive
                    ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-purple-500/30 scale-105"
                    : "bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 hover:text-white"
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Controls (Stars, Audio, Certificate, Help) */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => {
              playPop();
              onOpenCertificate();
            }}
            className="flex items-center gap-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-yellow-300 border border-yellow-500/40 px-3 py-1.5 rounded-full text-sm font-extrabold cursor-pointer transition"
          >
            <Sparkles className="w-4 h-4 text-yellow-400 animate-spin" />
            <span>⭐ {stars} Bintang</span>
          </button>

          <button
            onClick={() => {
              playPop();
              onToggleSound();
            }}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl transition cursor-pointer"
            title={soundEnabled ? "Matikan Suara" : "Nyalakan Suara"}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-green-400" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>

          <button
            onClick={() => {
              playPop();
              onOpenTutorial();
            }}
            className="flex items-center gap-1.5 bg-indigo-600/60 hover:bg-indigo-600 text-white px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition shadow"
          >
            <HelpCircle className="w-4 h-4 text-yellow-300" />
            <span>Cara Main</span>
          </button>
        </div>
      </div>
    </header>
  );
};

