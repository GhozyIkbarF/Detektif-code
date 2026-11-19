"use client";

import React from "react";
import { Sparkles, HelpCircle, Trophy, Volume2, VolumeX } from "lucide-react";
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
    {
      id: "emoji" as const,
      num: "1",
      shortLabel: "Emoji",
      fullLabel: "Level 1: Sandi Emoji",
      icon: "🐱",
    },
    {
      id: "binary" as const,
      num: "2",
      shortLabel: "Biner",
      fullLabel: "Level 2: Lampu Biner",
      icon: "💡",
    },
    {
      id: "caesar" as const,
      num: "3",
      shortLabel: "Geser",
      fullLabel: "Level 3: Sandi Geser",
      icon: "🎡",
    },
    {
      id: "lab" as const,
      num: "Lab",
      shortLabel: "Lab Bebas",
      fullLabel: "Laboratorium Bebas",
      icon: "🧪",
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-indigo-500/20 shadow-lg shadow-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5">
        <div className="flex items-center justify-between gap-4">
          {/* LEFT: Brand Identity */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-indigo-500/20 via-purple-500/30 to-pink-500/20 border border-indigo-400/30 flex items-center justify-center text-2xl shadow-inner select-none transition-transform hover:scale-105">
              🕵️‍♂️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black tracking-tight bg-gradient-to-r from-yellow-300 via-pink-400 to-cyan-300 bg-clip-text text-transparent leading-none">
                  Detektif Kode
                </h1>
                <span className="hidden sm:inline-flex px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 rounded-full">
                  Kids Edition
                </span>
              </div>
              <p className="text-[11px] text-indigo-200/80 font-medium hidden sm:block mt-0.5 leading-none">
                Petualangan Belajar Encoding &amp; Decoding
              </p>
            </div>
          </div>

          {/* CENTER: Clean Segmented Pill Navigation */}
          <nav className="hidden md:flex items-center p-1 bg-slate-950/80 rounded-2xl border border-indigo-500/20 shadow-inner">
            {tabs.map((tab) => {
              const isActive = currentTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    playPop();
                    onSelectTab(tab.id);
                  }}
                  className={`group relative flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs lg:text-sm font-bold transition-all duration-200 cursor-pointer select-none ${
                    isActive
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-indigo-600/30 font-extrabold scale-[1.02]"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  <span className="text-base leading-none transition-transform group-hover:scale-110">
                    {tab.icon}
                  </span>
                  <span className="hidden xl:inline">{tab.fullLabel}</span>
                  <span className="xl:hidden">{tab.shortLabel}</span>

                  {/* Active Indicator Dot */}
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-300 animate-pulse hidden xl:block" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* RIGHT: Actions Toolbar */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Stars & Certificate Button */}
            <button
              onClick={() => {
                playPop();
                onOpenCertificate();
              }}
              title="Lihat Sertifikat Detektif"
              className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500/15 to-yellow-500/15 hover:from-amber-500/25 hover:to-yellow-500/25 text-yellow-300 border border-yellow-500/30 hover:border-yellow-400/60 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-extrabold cursor-pointer transition-all shadow-sm active:scale-95"
            >
              <Trophy className="w-4 h-4 text-yellow-400" />
              <span>{stars}</span>
              <span className="hidden sm:inline text-xs text-yellow-200/90 font-bold">Bintang</span>
            </button>

            {/* Sound Toggle Button (Desktop & Tablet) */}
            <button
              onClick={() => {
                playPop();
                onToggleSound();
              }}
              className="hidden sm:flex p-2 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 hover:border-slate-600 text-slate-200 rounded-xl transition cursor-pointer active:scale-95"
              title={soundEnabled ? "Matikan Suara" : "Nyalakan Suara"}
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-400" />
              )}
            </button>

            {/* How to Play Button */}
            <button
              onClick={() => {
                playPop();
                onOpenTutorial();
              }}
              className="flex items-center gap-1.5 bg-indigo-600/80 hover:bg-indigo-500 text-white border border-indigo-400/40 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold cursor-pointer transition shadow-md shadow-indigo-600/20 active:scale-95"
            >
              <HelpCircle className="w-4 h-4 text-yellow-300" />
              <span className="hidden sm:inline">Cara Main</span>
            </button>
          </div>
        </div>

        {/* MOBILE SUB-NAV (Horizontal Scroll on Mobile Only) */}
        <div className="md:hidden mt-2 pt-2 border-t border-slate-800/60">
          <nav className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {tabs.map((tab) => {
              const isActive = currentTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    playPop();
                    onSelectTab(tab.id);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black shadow-sm"
                      : "bg-slate-800/70 text-slate-300"
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.shortLabel}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};
