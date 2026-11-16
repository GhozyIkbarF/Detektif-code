"use client";

import React, { useState } from "react";
import { X, ArrowRight, Lock, Unlock, Cpu, Sparkles, CheckCircle2 } from "lucide-react";
import { playPop, playSuccess } from "@/lib/sound";

interface StoryIntroModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StoryIntroModal: React.FC<StoryIntroModalProps> = ({ isOpen, onClose }) => {
  const [demoStep, setDemoStep] = useState<"plain" | "encoded">("plain");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-slate-900 to-indigo-950 border-2 border-indigo-500/40 rounded-3xl p-6 sm:p-8 text-white shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={() => {
            playPop();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="text-4xl animate-bounce">🎓</div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-yellow-300">
              Akademi Sandi Rahasia: Apa itu Encoding &amp; Decoding?
            </h2>
            <p className="text-xs sm:text-sm text-indigo-200 font-medium">
              Pelajari rahasia bagaimana komputer dan detektif berkirim pesan!
            </p>
          </div>
        </div>

        {/* 2 Core Cards: Encoding vs Decoding */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {/* Card 1: ENCODING */}
          <div className="bg-purple-900/40 border border-purple-500/50 rounded-2xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="p-2 bg-purple-600 rounded-xl">
                  <Lock className="w-5 h-5 text-white" />
                </span>
                <h3 className="font-extrabold text-purple-300 text-lg">1. ENCODING</h3>
              </div>
              <p className="text-xs sm:text-sm text-purple-100/90 leading-relaxed">
                <strong className="text-yellow-300">Mengubah Pesan Menjadi Kode.</strong>
                <br />
                Seperti menulis pesan rahasia dengan simbol, angka, atau emoji agar orang lain tidak bisa langsung membaca tanpa buku kunci!
              </p>
            </div>
            <div className="mt-3 p-2.5 bg-purple-950/70 rounded-xl text-xs font-mono border border-purple-800 flex items-center justify-between">
              <span className="text-cyan-300 font-bold">&quot;KUCING&quot;</span>
              <ArrowRight className="w-4 h-4 text-purple-400" />
              <span className="text-yellow-300 font-bold">🐱🚀⭐</span>
            </div>
          </div>

          {/* Card 2: DECODING */}
          <div className="bg-cyan-900/40 border border-cyan-500/50 rounded-2xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="p-2 bg-cyan-600 rounded-xl">
                  <Unlock className="w-5 h-5 text-white" />
                </span>
                <h3 className="font-extrabold text-cyan-300 text-lg">2. DECODING</h3>
              </div>
              <p className="text-xs sm:text-sm text-cyan-100/90 leading-relaxed">
                <strong className="text-yellow-300">Menerjemahkan Kode Kembali.</strong>
                <br />
                Membuka kode rahasia memakai &quot;Kamus Kunci&quot; (Cipher Key) sehingga pesan asli bisa dibaca kembali oleh kita!
              </p>
            </div>
            <div className="mt-3 p-2.5 bg-cyan-950/70 rounded-xl text-xs font-mono border border-cyan-800 flex items-center justify-between">
              <span className="text-yellow-300 font-bold">🐱🚀⭐</span>
              <ArrowRight className="w-4 h-4 text-cyan-400" />
              <span className="text-green-300 font-bold">&quot;KUCING&quot;</span>
            </div>
          </div>
        </div>

        {/* Why Computers do it */}
        <div className="bg-indigo-900/30 border border-indigo-500/30 rounded-2xl p-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Cpu className="w-5 h-5 text-yellow-400" />
            <h4 className="font-bold text-sm text-yellow-300">
              Kenapa Komputer Menggunakan Encoding?
            </h4>
          </div>
          <p className="text-xs text-indigo-100 leading-relaxed">
            Komputer di dalam HP atau laptop sebenarnya tidak bisa membaca huruf A, B, atau C! Komputer hanya punya jutaan saklar listrik kecil: <strong>Mati (0)</strong> dan <strong>Nyala (1)</strong>.
            Oleh karena itu, setiap kamu mengetik huruf, komputermu melakukan <strong>Encoding</strong> menjadi angka <strong>0 dan 1 (Biner)</strong>! Saat kamu membaca layar, komputermu melakukan <strong>Decoding</strong> kembali menjadi huruf.
          </p>
        </div>

        {/* Interactive Try-it Demo */}
        <div className="bg-slate-900/90 border-2 border-dashed border-yellow-500/50 rounded-2xl p-4 mb-6 text-center">
          <h4 className="text-xs uppercase tracking-wider font-extrabold text-yellow-400 mb-2">
            🎮 Coba Sendiri Alur Mesin Kode!
          </h4>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 my-3">
            <div className={`px-4 py-2 rounded-xl font-bold transition-all ${demoStep === "plain" ? "bg-yellow-400 text-slate-900 scale-105 shadow-lg shadow-yellow-400/30" : "bg-slate-800 text-slate-400"}`}>
              📝 Pesan Asli: &quot;HALO&quot;
            </div>

            <ArrowRight className="w-5 h-5 text-indigo-400 animate-pulse hidden sm:block" />

            <div className="px-3 py-1 bg-purple-700/60 rounded-lg text-xs font-mono text-purple-200">
              ⚙️ Mesin Enkoder
            </div>

            <ArrowRight className="w-5 h-5 text-indigo-400 animate-pulse hidden sm:block" />

            <div className={`px-4 py-2 rounded-xl font-bold transition-all ${demoStep === "encoded" ? "bg-cyan-400 text-slate-900 scale-105 shadow-lg shadow-cyan-400/30" : "bg-slate-800 text-slate-400"}`}>
              {demoStep === "encoded" ? "🔒 Kode: 🏠🍎🍋🍊" : "🔒 Kode Terkunci"}
            </div>
          </div>

          <div className="flex justify-center gap-3 mt-3">
            <button
              onClick={() => {
                setDemoStep("encoded");
                playSuccess();
              }}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition cursor-pointer shadow"
            >
              <Lock className="w-4 h-4" />
              <span>Ubah ke Kode (Encode!)</span>
            </button>
            <button
              onClick={() => {
                setDemoStep("plain");
                playPop();
              }}
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition cursor-pointer shadow"
            >
              <Unlock className="w-4 h-4" />
              <span>Kembalikan Pesan (Decode!)</span>
            </button>
          </div>
        </div>

        {/* Start Button */}
        <div className="flex justify-center">
          <button
            onClick={() => {
              playSuccess();
              onClose();
            }}
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-slate-950 font-black text-base rounded-2xl shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>Mulai Misi Detektif Sekarang! 🚀</span>
          </button>
        </div>
      </div>
    </div>
  );
};

