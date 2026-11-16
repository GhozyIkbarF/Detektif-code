"use client";

import React, { useState, useMemo } from "react";
import { EMOJI_DICTIONARY, EMOJI_MISSIONS } from "@/lib/gameData";
import { playPop, playSuccess, playError, playVictory } from "@/lib/sound";
import { Sparkles, BookOpen, Lightbulb, RefreshCw, CheckCircle, ArrowRight, Lock, Unlock } from "lucide-react";

interface LevelEmojiProps {
  onEarnStar: () => void;
  onTriggerConfetti: () => void;
}

export const LevelEmoji: React.FC<LevelEmojiProps> = ({ onEarnStar, onTriggerConfetti }) => {
  const [missionIndex, setMissionIndex] = useState(0);
  const [userInput, setUserInput] = useState<string[]>([]);
  const [showDictionary, setShowDictionary] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [completedMissions, setCompletedMissions] = useState<number[]>([]);

  const currentMission = EMOJI_MISSIONS[missionIndex];
  const targetChars = currentMission.word.split("");

  // Handle letter click in DECODE mode
  const handleSelectChar = (char: string) => {
    if (isSuccess) return;
    playPop();

    if (userInput.length < targetChars.length) {
      const nextInput = [...userInput, char];
      setUserInput(nextInput);

      // Check if full word entered
      if (nextInput.length === targetChars.length) {
        if (nextInput.join("") === currentMission.word) {
          triggerWin();
        } else {
          playError();
        }
      }
    }
  };

  // Handle emoji click in ENCODE mode
  const handleSelectEmoji = (char: string) => {
    if (isSuccess) return;
    playPop();

    if (userInput.length < targetChars.length) {
      const nextInput = [...userInput, char];
      setUserInput(nextInput);

      if (nextInput.length === targetChars.length) {
        if (nextInput.join("") === currentMission.word) {
          triggerWin();
        } else {
          playError();
        }
      }
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

  const triggerWin = () => {
    setIsSuccess(true);
    playVictory();
    onTriggerConfetti();
    if (!completedMissions.includes(currentMission.id)) {
      setCompletedMissions((prev) => [...prev, currentMission.id]);
      onEarnStar();
    }
  };

  const nextMission = () => {
    playPop();
    setIsSuccess(false);
    setUserInput([]);
    setShowHint(false);
    setMissionIndex((prev) => (prev + 1) % EMOJI_MISSIONS.length);
  };

  // Generate candidate choices for kid-friendly selection
  // Diurutkan secara alfabetis agar deterministik dan tidak menyebabkan hydration mismatch antara Server & Client
  const candidateLetters = useMemo(() => {
    const extraLetters = ["A", "B", "K", "L", "M", "S", "T", "R", "U", "N", "O", "P"];
    const availableExtras = extraLetters.filter((char) => !targetChars.includes(char));
    const remainingSlots = Math.max(0, 10 - targetChars.length);
    return Array.from(new Set([...targetChars, ...availableExtras.slice(0, remainingSlots)])).sort();
  }, [currentMission.word]);

  return (
    <div className="space-y-6">
      {/* Top Mission Header Banner */}
      <div className="bg-gradient-to-r from-purple-800/80 via-indigo-800/80 to-slate-900 border border-purple-500/30 rounded-3xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className="text-4xl p-3 bg-purple-950/80 rounded-2xl border border-purple-600/40 animate-float">
              🐱
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black tracking-wide uppercase bg-purple-500/20 text-purple-300 border border-purple-500/40">
                  Misi #{currentMission.id} dari {EMOJI_MISSIONS.length}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-black flex items-center gap-1 ${currentMission.type === "decode"
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                  : "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                  }`}>
                  {currentMission.type === "decode" ? <Unlock className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                  {currentMission.type === "decode" ? "Misi DECODING (Pecahkan Sandi)" : "Misi ENCODING (Rakit Sandi)"}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                {currentMission.narrative}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              onClick={() => {
                playPop();
                setShowDictionary(!showDictionary);
              }}
              className="flex items-center gap-1.5 px-3 py-2 bg-indigo-600/60 hover:bg-indigo-600 text-indigo-100 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer shadow"
            >
              <BookOpen className="w-4 h-4 text-yellow-300" />
              <span>{showDictionary ? "Tutup Kamus" : "Buku Kamus Kode 📖"}</span>
            </button>
            <button
              onClick={() => {
                playPop();
                setShowHint(!showHint);
              }}
              className="flex items-center gap-1.5 px-3 py-2 bg-amber-600/40 hover:bg-amber-600/60 text-amber-200 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer"
            >
              <Lightbulb className="w-4 h-4 text-yellow-300" />
              <span>Petunjuk</span>
            </button>
          </div>
        </div>

        {/* Clue message */}
        {showHint && (
          <div className="mt-4 p-3 bg-amber-950/60 border border-amber-500/50 rounded-2xl text-amber-200 text-sm flex items-center gap-2 animate-in fade-in">
            <Lightbulb className="w-5 h-5 text-yellow-400 shrink-0" />
            <span>💡 <strong>Petunjuk Detektif:</strong> {currentMission.clue}</span>
          </div>
        )}
      </div>

      {/* Kamus Kode Popout */}
      {showDictionary && (
        <div className="bg-slate-900/95 border-2 border-indigo-500/50 rounded-3xl p-5 shadow-2xl animate-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">📖</span>
              <h3 className="font-extrabold text-yellow-300 text-base">
                Kamus Sandi Rahasia Detektif (Cipher Table)
              </h3>
            </div>
            <p className="text-xs text-indigo-300">
              Lihat simbol emoji untuk setiap huruf!
            </p>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-9 gap-2">
            {Object.entries(EMOJI_DICTIONARY).map(([char, item]) => (
              <div
                key={char}
                className="bg-slate-800/80 border border-slate-700 hover:border-yellow-400 rounded-xl p-2 text-center transition group cursor-default"
              >
                <div className="text-2xl group-hover:scale-125 transition-transform">
                  {item.emoji}
                </div>
                <div className="font-black text-sm text-yellow-300 mt-1">
                  {char}
                </div>
                <div className="text-[10px] text-slate-400 truncate">
                  {item.name.split(" ")[0]}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Mission Workspace */}
      <div className="bg-slate-900/80 border border-indigo-500/30 rounded-3xl p-6 sm:p-8 shadow-xl">
        {/* Instruction explanation based on type */}
        <div className="text-center mb-6">
          <p className="text-xs sm:text-sm text-indigo-200 font-semibold mb-2">
            {currentMission.type === "decode" ? (
              <span>🔍 <strong>DECODING:</strong> Terjemahkan barisan emoji rahasia ini menjadi kata aslinya!</span>
            ) : (
              <span>⚙️ <strong>ENCODING:</strong> Ubah kata ini menjadi barisan emoji rahasia untuk dikirim!</span>
            )}
          </p>

          {/* Target Display */}
          {currentMission.type === "decode" ? (
            /* Show emojis to decode */
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 my-4">
              {targetChars.map((char, idx) => {
                const info = EMOJI_DICTIONARY[char] || { emoji: "❓" };
                return (
                  <div
                    key={idx}
                    className="flex flex-col items-center p-3 sm:p-4 bg-gradient-to-b from-indigo-950 to-slate-900 border-2 border-indigo-400/60 rounded-2xl shadow-lg transform hover:-translate-y-1 transition"
                  >
                    <span className="text-3xl sm:text-4xl animate-bounce" style={{ animationDelay: `${idx * 150}ms` }}>
                      {info.emoji}
                    </span>
                    <span className="text-[11px] text-indigo-300 mt-1 font-mono">
                      Simbol #{idx + 1}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Show word to encode */
            <div className="my-4">
              <span className="text-xs text-amber-300 font-bold uppercase tracking-wider block mb-1">
                Kata Yang Harus Di-ENCODE Menjadi Emoji:
              </span>
              <div className="inline-flex gap-2 p-3 bg-amber-950/50 border-2 border-amber-500/50 rounded-2xl">
                {targetChars.map((char, idx) => (
                  <span
                    key={idx}
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-500 text-slate-950 text-xl sm:text-2xl font-black rounded-xl flex items-center justify-center shadow"
                  >
                    {char}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Input Slots / Slots yang sedang diisi anak */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-6">
          {targetChars.map((char, idx) => {
            const currentFilled = userInput[idx];
            const isFilled = currentFilled !== undefined;

            return (
              <div
                key={idx}
                className={`w-12 h-14 sm:w-16 sm:h-18 rounded-2xl flex flex-col items-center justify-center border-2 transition-all font-black text-xl sm:text-2xl shadow-inner ${isFilled
                  ? isSuccess
                    ? "bg-green-500/30 border-green-400 text-green-300 scale-105"
                    : "bg-indigo-600/40 border-indigo-400 text-white"
                  : "bg-slate-950/60 border-slate-700 text-slate-500 border-dashed"
                  }`}
              >
                {currentMission.type === "decode" ? (
                  // Show entered letter
                  <span>{currentFilled || "_"}</span>
                ) : (
                  // Show selected emoji
                  <span className="text-2xl sm:text-3xl">
                    {currentFilled ? EMOJI_DICTIONARY[currentFilled]?.emoji : "❓"}
                  </span>
                )}
                <span className="text-[9px] text-slate-400 font-normal">
                  Kotak {idx + 1}
                </span>
              </div>
            );
          })}
        </div>

        {/* Keyboard / Choice buttons for kids */}
        {!isSuccess ? (
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={handleBackspace}
                disabled={userInput.length === 0}
                className="px-4 py-2 bg-rose-600/40 hover:bg-rose-600/60 disabled:opacity-30 text-rose-200 rounded-xl text-xs font-bold transition cursor-pointer"
              >
                Hapus 1 Huruf ⌫
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

            {/* Clickable Choices */}
            {currentMission.type === "decode" ? (
              /* Letter choices */
              <div className="flex flex-wrap justify-center gap-2 max-w-lg mx-auto">
                {candidateLetters.map((letter) => (
                  <button
                    key={letter}
                    onClick={() => handleSelectChar(letter)}
                    className="w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-b from-indigo-500 to-indigo-700 hover:from-indigo-400 hover:to-indigo-600 active:scale-95 text-white font-black text-lg sm:text-xl rounded-xl shadow-md transition cursor-pointer border border-indigo-400/30"
                  >
                    {letter}
                  </button>
                ))}
              </div>
            ) : (
              /* Emoji choices */
              <div className="flex flex-wrap justify-center gap-2 max-w-xl mx-auto">
                {candidateLetters.map((char) => {
                  const info = EMOJI_DICTIONARY[char];
                  if (!info) return null;
                  return (
                    <button
                      key={char}
                      onClick={() => handleSelectEmoji(char)}
                      className="px-3 py-2 bg-slate-800 hover:bg-purple-900/60 active:scale-95 rounded-xl border border-slate-700 hover:border-purple-400 flex items-center gap-1.5 transition cursor-pointer shadow"
                    >
                      <span className="text-2xl">{info.emoji}</span>
                      <span className="font-bold text-xs text-yellow-300">({char})</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          /* Victory Banner */
          <div className="text-center p-6 bg-gradient-to-r from-emerald-900/50 to-teal-900/50 border-2 border-emerald-400 rounded-3xl animate-in zoom-in-95">
            <div className="text-5xl mb-2">🎉🏆🌟</div>
            <h3 className="text-xl sm:text-2xl font-black text-emerald-300 mb-1">
              Luar Biasa, Detektif Cilik!
            </h3>
            <p className="text-sm text-emerald-100 max-w-md mx-auto mb-4">
              {currentMission.type === "decode" ? (
                <span>
                  Kamu berhasil melakukan <strong>DECODING</strong>! Pesan rahasia tersebut adalah kata <strong>&quot;{currentMission.word}&quot;</strong>!
                </span>
              ) : (
                <span>
                  Kamu berhasil melakukan <strong>ENCODING</strong>! Kata <strong>&quot;{currentMission.word}&quot;</strong> telah aman diubah menjadi kode rahasia emoji!
                </span>
              )}
            </p>

            <button
              onClick={nextMission}
              className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-slate-950 font-black text-sm rounded-2xl shadow-lg transition cursor-pointer inline-flex items-center gap-2"
            >
              <span>Lanjut ke Misi Berikutnya!</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

