"use client";

import React, { useState } from "react";
import { BINARY_MISSIONS } from "@/lib/gameData";
import { playPop, playSuccess, playVictory, playSwitch } from "@/lib/sound";
import { Sparkles, Lightbulb, Zap, ArrowRight, CheckCircle2, RotateCcw, Cpu } from "lucide-react";

interface LevelBinaryProps {
  onEarnStar: () => void;
  onTriggerConfetti: () => void;
}

export const LevelBinary: React.FC<LevelBinaryProps> = ({ onEarnStar, onTriggerConfetti }) => {
  const [missionIndex, setMissionIndex] = useState(0);
  const [switches, setSwitches] = useState<[boolean, boolean, boolean, boolean, boolean]>([
    false,
    false,
    false,
    false,
    false,
  ]); // [16, 8, 4, 2, 1]
  const [isSuccess, setIsSuccess] = useState(false);
  const [showCheatSheet, setShowCheatSheet] = useState(false);
  const [completedMissions, setCompletedMissions] = useState<number[]>([]);

  const currentMission = BINARY_MISSIONS[missionIndex];

  // Bit values: [16, 8, 4, 2, 1]
  const bitWeights = [16, 8, 4, 2, 1];

  // Calculate total decimal value from active switches
  const currentTotal = switches.reduce((acc, active, idx) => (active ? acc + bitWeights[idx] : acc), 0);

  // Convert decimal to Letter (1 -> A, 2 -> B, ..., 26 -> Z)
  const currentLetter =
    currentTotal >= 1 && currentTotal <= 26 ? String.fromCharCode(64 + currentTotal) : currentTotal > 26 ? "⚠️ (Maksimal Z = 26)" : "Kosong";

  const toggleSwitch = (index: number) => {
    if (isSuccess) return;
    const nextState: [boolean, boolean, boolean, boolean, boolean] = [...switches];
    nextState[index] = !nextState[index];
    playSwitch(nextState[index]);
    setSwitches(nextState);

    // Calculate new total
    const newTotal = nextState.reduce((acc, active, idx) => (active ? acc + bitWeights[idx] : acc), 0);

    if (newTotal === currentMission.val) {
      triggerWin();
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

  const resetSwitches = () => {
    playPop();
    setSwitches([false, false, false, false, false]);
    setIsSuccess(false);
  };

  const nextMission = () => {
    playPop();
    setIsSuccess(false);
    setSwitches([false, false, false, false, false]);
    setMissionIndex((prev) => (prev + 1) % BINARY_MISSIONS.length);
  };

  return (
    <div className="space-y-6">
      {/* Mission Banner */}
      <div className="bg-gradient-to-r from-cyan-900/80 via-blue-900/80 to-slate-900 border border-cyan-500/30 rounded-3xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="text-4xl p-3 bg-cyan-950/80 rounded-2xl border border-cyan-600/40 animate-pulse">
              🤖
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black tracking-wide uppercase bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  Misi Biner #{currentMission.id} dari {BINARY_MISSIONS.length}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-blue-500/20 text-blue-300 border border-blue-500/40 flex items-center gap-1">
                  <Zap className="w-3 h-3 text-yellow-400" />
                  <span>Sandi Lampu Listrik (0 &amp; 1)</span>
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
                setShowCheatSheet(!showCheatSheet);
              }}
              className="px-3 py-2 bg-indigo-600/60 hover:bg-indigo-600 text-indigo-100 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer shadow"
            >
              <span>{showCheatSheet ? "Tutup Tabel" : "Tabel Huruf Biner 📋"}</span>
            </button>
            <button
              onClick={resetSwitches}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Target Letter Goal */}
        <div className="mt-5 p-4 bg-cyan-950/70 border border-cyan-500/40 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-14 h-14 bg-gradient-to-tr from-yellow-400 to-amber-300 text-slate-950 text-3xl font-black rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-400/20">
              {currentMission.letter}
            </div>
            <div>
              <div className="text-xs text-cyan-300 font-bold uppercase tracking-wider">
                Misi Robot: Buat Huruf Ini!
              </div>
              <div className="text-sm font-bold text-white">
                Huruf ke-{currentMission.val} dalam alfabet
              </div>
              <div className="text-xs text-indigo-200 mt-0.5">
                💡 {currentMission.hint}
              </div>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs text-slate-300 block">Kode Biner Target:</span>
            <span className="text-lg font-mono font-black text-yellow-300 tracking-widest">
              {currentMission.val.toString(2).padStart(5, "0")}
            </span>
          </div>
        </div>
      </div>

      {/* Cheat Sheet Table Modal/Panel */}
      {showCheatSheet && (
        <div className="bg-slate-900/95 border-2 border-cyan-500/50 rounded-3xl p-5 shadow-2xl animate-in zoom-in-95">
          <h3 className="font-extrabold text-cyan-300 text-base mb-2 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-yellow-400" />
            <span>Tabel Konversi Angka ke Huruf &amp; Biner (1 - 10)</span>
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {[
              { char: "A", val: 1, bin: "00001" },
              { char: "B", val: 2, bin: "00010" },
              { char: "C", val: 3, bin: "00011" },
              { char: "D", val: 4, bin: "00100" },
              { char: "E", val: 5, bin: "00101" },
              { char: "F", val: 6, bin: "00110" },
              { char: "G", val: 7, bin: "00111" },
              { char: "H", val: 8, bin: "01000" },
              { char: "I", val: 9, bin: "01001" },
              { char: "J", val: 10, bin: "01010" },
            ].map((item) => (
              <div
                key={item.char}
                className="p-2.5 bg-slate-800 rounded-xl border border-slate-700 text-center"
              >
                <div className="text-lg font-black text-yellow-300">{item.char}</div>
                <div className="text-xs text-cyan-300">Nilai: {item.val}</div>
                <div className="text-[11px] font-mono text-slate-400">{item.bin}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Interactive Bulb Workbench */}
      <div className="bg-slate-900/80 border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="text-center mb-6">
          <p className="text-xs sm:text-sm text-cyan-200 font-semibold">
            Klik saklar lampu di bawah ini untuk <strong>Menyalakan (1)</strong> atau <strong>Mematikan (0)</strong> saklar listrik robot!
          </p>
        </div>

        {/* 5 Big Bulbs Grid */}
        <div className="grid grid-cols-5 gap-2 sm:gap-4 max-w-2xl mx-auto mb-8">
          {bitWeights.map((weight, idx) => {
            const isOn = switches[idx];
            return (
              <div
                key={weight}
                onClick={() => toggleSwitch(idx)}
                className={`group flex flex-col items-center p-3 sm:p-5 rounded-2xl sm:rounded-3xl border-2 transition-all duration-300 cursor-pointer select-none ${
                  isOn
                    ? "bg-gradient-to-b from-yellow-500/30 to-amber-600/30 border-yellow-400 shadow-lg shadow-yellow-500/30 scale-105"
                    : "bg-slate-950/60 border-slate-800 hover:border-slate-600 opacity-80"
                }`}
              >
                {/* Weight / Value Badge */}
                <div className={`px-2 py-0.5 rounded-full text-[11px] sm:text-xs font-black mb-3 ${
                  isOn ? "bg-yellow-400 text-slate-950" : "bg-slate-800 text-slate-400"
                }`}>
                  +{weight}
                </div>

                {/* Animated Glowing Bulb Icon */}
                <div className="relative my-2">
                  <div className={`text-4xl sm:text-5xl transition-transform duration-300 ${
                    isOn ? "scale-125 filter drop-shadow-[0_0_15px_rgba(250,204,21,0.9)]" : "filter grayscale opacity-40"
                  }`}>
                    💡
                  </div>
                </div>

                {/* Bit state 0 or 1 */}
                <div className="mt-3 text-center">
                  <span className={`inline-block px-3 py-1 rounded-xl font-mono text-base sm:text-xl font-black ${
                    isOn ? "bg-yellow-400 text-slate-950" : "bg-slate-800 text-slate-500"
                  }`}>
                    {isOn ? "1" : "0"}
                  </span>
                  <div className="text-[10px] sm:text-xs text-slate-400 mt-1 font-medium">
                    {isOn ? "NYALA" : "PADAM"}
                  </div>
                </div>

                {/* Switch lever visual */}
                <div className="mt-2 w-full pt-2 border-t border-slate-800 flex justify-center">
                  <div className={`w-8 h-4 rounded-full p-0.5 transition-colors ${
                    isOn ? "bg-green-500" : "bg-slate-700"
                  }`}>
                    <div className={`w-3 h-3 rounded-full bg-white transition-transform ${
                      isOn ? "translate-x-4" : "translate-x-0"
                    }`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Realtime Live Calculation & Output Box */}
        <div className="bg-slate-950/80 border-2 border-cyan-500/40 rounded-2xl p-4 sm:p-6 max-w-xl mx-auto text-center space-y-4">
          <div className="text-xs uppercase tracking-wider font-extrabold text-cyan-400">
            📊 Hasil Pembacaan Komputer Saat Ini:
          </div>

          {/* Mathematical breakdown */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-mono text-slate-300">
            {bitWeights.map((weight, idx) => (
              <span key={weight} className="flex items-center gap-1">
                <span className={switches[idx] ? "text-yellow-300 font-bold" : "text-slate-600 line-through"}>
                  {switches[idx] ? weight : 0}
                </span>
                {idx < bitWeights.length - 1 && <span className="text-slate-500">+</span>}
              </span>
            ))}
            <span className="text-slate-400">=</span>
            <span className="text-lg font-black text-cyan-300 px-2 py-0.5 bg-cyan-950 rounded-lg">
              {currentTotal}
            </span>
          </div>

          {/* Generated Letter Display */}
          <div className="pt-2 border-t border-slate-800 flex items-center justify-center gap-4">
            <div>
              <span className="text-xs text-slate-400 block">Kode Biner Kamu:</span>
              <span className="font-mono text-lg font-black text-cyan-300 tracking-wider">
                {switches.map((s) => (s ? "1" : "0")).join("")}
              </span>
            </div>

            <div className="h-8 w-px bg-slate-800" />

            <div>
              <span className="text-xs text-slate-400 block">Huruf Terbentuk (DECODE):</span>
              <span className={`text-2xl sm:text-3xl font-black ${
                currentTotal === currentMission.val ? "text-green-400 animate-bounce" : "text-yellow-400"
              }`}>
                {currentLetter}
              </span>
            </div>
          </div>
        </div>

        {/* Success Modal / Banner */}
        {isSuccess && (
          <div className="mt-6 text-center p-6 bg-gradient-to-r from-emerald-900/50 to-teal-900/50 border-2 border-emerald-400 rounded-3xl animate-in zoom-in-95">
            <div className="text-5xl mb-2">⚡💡🤖🎉</div>
            <h3 className="text-xl sm:text-2xl font-black text-emerald-300 mb-1">
              Bip Bop! Hebat Sekali!
            </h3>
            <p className="text-sm text-emerald-100 max-w-md mx-auto mb-4">
              Robot Bibo menerima sinyal biner <strong>{currentMission.val.toString(2).padStart(5, "0")}</strong> yang berhasil di-decode menjadi huruf <strong>&quot;{currentMission.letter}&quot;</strong>!
            </p>

            <button
              onClick={nextMission}
              className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-slate-950 font-black text-sm rounded-2xl shadow-lg transition cursor-pointer inline-flex items-center gap-2"
            >
              <span>Misi Biner Berikutnya!</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

