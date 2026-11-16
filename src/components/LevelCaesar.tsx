"use client";

import React, { useState } from "react";
import { CAESAR_MISSIONS } from "@/lib/gameData";
import { playPop, playSuccess, playVictory, playError } from "@/lib/sound";
import { RotateCw, ArrowRight, CheckCircle2, RefreshCw, Key, Shield } from "lucide-react";

interface LevelCaesarProps {
  onEarnStar: () => void;
  onTriggerConfetti: () => void;
}

export const LevelCaesar: React.FC<LevelCaesarProps> = ({ onEarnStar, onTriggerConfetti }) => {
  const [missionIndex, setMissionIndex] = useState(0);
  const [wheelShift, setWheelShift] = useState(1);
  const [userInput, setUserInput] = useState<string[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [completedMissions, setCompletedMissions] = useState<number[]>([]);

  const currentMission = CAESAR_MISSIONS[missionIndex];
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  // Helper to shift char
  const shiftChar = (char: string, shift: number) => {
    const idx = alphabet.indexOf(char);
    if (idx === -1) return char;
    const newIdx = (idx + shift) % 26;
    return alphabet[newIdx >= 0 ? newIdx : newIdx + 26];
  };

  const targetChars = currentMission.plain.split("");

  const handleSelectChar = (char: string) => {
    if (isSuccess) return;
    playPop();

    if (userInput.length < targetChars.length) {
      const nextInput = [...userInput, char];
      setUserInput(nextInput);

      if (nextInput.length === targetChars.length) {
        if (nextInput.join("") === currentMission.plain) {
          triggerWin();
        } else {
          playError();
        }
      }
    }
  };

  const triggerWin = () => {
    setIsSuccess(true);
    playVictory();
    onTriggerConfetti();
    if (!completedMissions.includes(currentMission.id)) {
      setCompletedMissions((prev) => [...prev, currentMission.id]);
      onEarnStar();
    }
  };

  const handleBackspace = () => {
    playPop();
    setUserInput((prev) => prev.slice(0, -1));
  };

  const handleReset = () => {
    playPop();
    setUserInput([]);
    setIsSuccess(false);
  };

  const nextMission = () => {
    playPop();
    setIsSuccess(false);
    setUserInput([]);
    setMissionIndex((prev) => (prev + 1) % CAESAR_MISSIONS.length);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-900/80 via-orange-900/80 to-slate-900 border border-amber-500/30 rounded-3xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="text-4xl p-3 bg-amber-950/80 rounded-2xl border border-amber-600/40 animate-spin" style={{ animationDuration: "12s" }}>
              🎡
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  Misi Sandi Geser #{currentMission.id} dari {CAESAR_MISSIONS.length}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-orange-500/20 text-orange-300 border border-orange-500/40 flex items-center gap-1">
                  <Key className="w-3 h-3 text-yellow-300" />
                  <span>Kunci Geser: +{currentMission.shift}</span>
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                {currentMission.narrative}
              </h2>
            </div>
          </div>

          <div className="p-3 bg-amber-950/70 border border-amber-500/40 rounded-2xl text-center self-stretch sm:self-auto">
            <span className="text-[11px] text-amber-300 font-bold block">KUNCI RAHASIA (SHIFT)</span>
            <span className="text-2xl font-black text-yellow-300">+{currentMission.shift} Huruf</span>
          </div>
        </div>

        <div className="mt-4 p-3 bg-amber-950/40 border border-amber-500/30 rounded-2xl text-xs sm:text-sm text-amber-200">
          💡 <strong>Petunjuk:</strong> {currentMission.hint}
        </div>
      </div>

      {/* Interactive Caesar Cipher Wheel / Strip */}
      <div className="bg-slate-900/90 border border-amber-500/30 rounded-3xl p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="font-extrabold text-amber-300 text-base flex items-center gap-2">
              <RotateCw className="w-5 h-5 text-yellow-400" />
              <span>Roda Penggeser Sandi Interaktif (Cipher Ruler)</span>
            </h3>
            <p className="text-xs text-slate-300">
              Ubah tuas penggeser untuk mencocokkan kunci rahasia (+{currentMission.shift})!
            </p>
          </div>

          {/* Shift selector buttons */}
          <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-2xl border border-slate-800">
            <span className="text-xs font-bold text-slate-400">Putar Tuas:</span>
            {[1, 2, 3, 4].map((s) => (
              <button
                key={s}
                onClick={() => {
                  playPop();
                  setWheelShift(s);
                }}
                className={`w-8 h-8 rounded-xl font-bold text-xs transition cursor-pointer ${
                  wheelShift === s
                    ? "bg-amber-500 text-slate-950 shadow-md font-black"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                +{s}
              </button>
            ))}
          </div>
        </div>

        {/* Visual Dual Alphabet Ruler */}
        <div className="overflow-x-auto pb-3 pt-1 scrollbar-none">
          <div className="inline-flex flex-col gap-1.5 min-w-[700px] p-3 bg-slate-950 rounded-2xl border border-slate-800">
            {/* Top row: Plain Alphabet */}
            <div className="flex items-center gap-1">
              <div className="w-24 text-[11px] font-bold text-slate-400 px-2">
                Huruf Asli:
              </div>
              <div className="flex gap-1">
                {alphabet.slice(0, 15).map((char) => (
                  <div
                    key={char}
                    className="w-8 h-8 sm:w-9 sm:h-9 bg-slate-800 border border-slate-700 rounded-lg flex items-center justify-center font-bold text-xs sm:text-sm text-cyan-300 shadow"
                  >
                    {char}
                  </div>
                ))}
              </div>
            </div>

            {/* Shift Arrow Indicators */}
            <div className="flex items-center gap-1 pl-24">
              <div className="flex gap-1">
                {alphabet.slice(0, 15).map((char) => (
                  <div key={char} className="w-8 sm:w-9 text-center text-amber-400 text-xs font-bold">
                    ↓
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom row: Shifted Alphabet */}
            <div className="flex items-center gap-1">
              <div className="w-24 text-[11px] font-bold text-amber-400 px-2">
                Sandi (+{wheelShift}):
              </div>
              <div className="flex gap-1">
                {alphabet.slice(0, 15).map((char) => (
                  <div
                    key={char}
                    className="w-8 h-8 sm:w-9 sm:h-9 bg-amber-950/80 border border-amber-500/50 rounded-lg flex items-center justify-center font-black text-xs sm:text-sm text-yellow-300 shadow"
                  >
                    {shiftChar(char, wheelShift)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Decoding Puzzle Box */}
      <div className="bg-slate-900/80 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="text-center mb-6">
          <span className="text-xs font-bold text-amber-300 uppercase tracking-widest block mb-1">
            Kode Rahasia Yang Diterima (Tersandi):
          </span>
          <div className="inline-flex gap-2 p-3 bg-amber-950/60 border-2 border-amber-500/50 rounded-2xl shadow-lg">
            {currentMission.cipher.split("").map((c, idx) => (
              <div
                key={idx}
                className="w-12 h-14 bg-gradient-to-b from-amber-500 to-amber-600 text-slate-950 rounded-xl flex flex-col items-center justify-center font-black shadow"
              >
                <span className="text-2xl">{c}</span>
                <span className="text-[9px] text-amber-950 font-medium">#{idx + 1}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-indigo-200 mt-2">
            Gunakan penggeser di atas untuk menemukan huruf aslinya (geser mundur {currentMission.shift} langkah)!
          </p>
        </div>

        {/* User Decoded Slots */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-6">
          {targetChars.map((_, idx) => {
            const currentFilled = userInput[idx];
            return (
              <div
                key={idx}
                className={`w-12 h-14 sm:w-16 sm:h-18 rounded-2xl flex flex-col items-center justify-center border-2 transition-all font-black text-xl sm:text-2xl ${
                  currentFilled
                    ? isSuccess
                      ? "bg-green-500/30 border-green-400 text-green-300 scale-105"
                      : "bg-amber-600/40 border-amber-400 text-white"
                    : "bg-slate-950/60 border-slate-700 text-slate-500 border-dashed"
                }`}
              >
                <span>{currentFilled || "_"}</span>
                <span className="text-[9px] text-slate-400 font-normal">Huruf {idx + 1}</span>
              </div>
            );
          })}
        </div>

        {/* Keypad */}
        {!isSuccess ? (
          <div className="space-y-4">
            <div className="flex justify-center gap-2">
              <button
                onClick={handleBackspace}
                disabled={userInput.length === 0}
                className="px-4 py-2 bg-rose-600/40 hover:bg-rose-600/60 disabled:opacity-30 text-rose-200 rounded-xl text-xs font-bold transition cursor-pointer"
              >
                Hapus ⌫
              </button>
              <button
                onClick={handleReset}
                disabled={userInput.length === 0}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-300 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Ulangi</span>
              </button>
            </div>

            <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 max-w-lg mx-auto">
              {"ABCDEFGHIJKLMNO".split("").map((letter) => (
                <button
                  key={letter}
                  onClick={() => handleSelectChar(letter)}
                  className="w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-b from-amber-500 to-amber-700 hover:from-amber-400 hover:to-amber-600 active:scale-95 text-slate-950 font-black text-base sm:text-lg rounded-xl shadow-md transition cursor-pointer"
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Victory Banner */
          <div className="text-center p-6 bg-gradient-to-r from-emerald-900/50 to-teal-900/50 border-2 border-emerald-400 rounded-3xl animate-in zoom-in-95">
            <div className="text-5xl mb-2">🏆🗝️✨</div>
            <h3 className="text-xl sm:text-2xl font-black text-emerald-300 mb-1">
              Sandi Geser Berhasil Dipecahkan!
            </h3>
            <p className="text-sm text-emerald-100 max-w-md mx-auto mb-4">
              Kode sandi <strong>&quot;{currentMission.cipher}&quot;</strong> berhasil di-decode menjadi kata asli <strong>&quot;{currentMission.plain}&quot;</strong>!
            </p>

            <button
              onClick={nextMission}
              className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-slate-950 font-black text-sm rounded-2xl shadow-lg transition cursor-pointer inline-flex items-center gap-2"
            >
              <span>Misi Sandi Geser Berikutnya!</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

