"use client";

import React, { useState } from "react";
import { EMOJI_DICTIONARY, MORSE_CODE } from "@/lib/gameData";
import { playPop, playSuccess, playMorseBeep } from "@/lib/sound";
import { Lock, Unlock, Play, Volume2, Copy, Check, Sparkles, Cpu, Radio, RotateCcw, Share2 } from "lucide-react";

type CipherType = "emoji" | "binary" | "morse" | "caesar" | "reverse" | "number";

export const SecretLab: React.FC = () => {
  const [inputText, setInputText] = useState("KUCING PINTAR");
  const [cipherType, setCipherType] = useState<CipherType>("emoji");
  const [caesarShift, setCaesarShift] = useState(3);
  const [copied, setCopied] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Encode logic
  const encodeText = (text: string, type: CipherType): string => {
    const upper = text.toUpperCase();

    switch (type) {
      case "emoji": {
        return upper
          .split("")
          .map((ch) => {
            if (ch === " ") return "  ";
            return EMOJI_DICTIONARY[ch]?.emoji || ch;
          })
          .join(" ");
      }
      case "binary": {
        return upper
          .split("")
          .map((ch) => ch.charCodeAt(0).toString(2).padStart(8, "0"))
          .join(" ");
      }
      case "morse": {
        return upper
          .split("")
          .map((ch) => MORSE_CODE[ch] || ch)
          .join(" ");
      }
      case "caesar": {
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        return upper
          .split("")
          .map((ch) => {
            const idx = alphabet.indexOf(ch);
            if (idx === -1) return ch;
            return alphabet[(idx + caesarShift) % 26];
          })
          .join("");
      }
      case "reverse": {
        return upper.split("").reverse().join("");
      }
      case "number": {
        return upper
          .split("")
          .map((ch) => {
            if (ch >= "A" && ch <= "Z") {
              return String(ch.charCodeAt(0) - 64);
            }
            return ch;
          })
          .join("-");
      }
      default:
        return text;
    }
  };

  const outputCode = encodeText(inputText, cipherType);

  const handleCopy = () => {
    playSuccess();
    navigator.clipboard.writeText(outputCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const playMorseAudio = () => {
    if (isPlayingAudio) return;
    setIsPlayingAudio(true);

    const morseString = encodeText(inputText, "morse");
    let currentDelay = 0;

    for (let i = 0; i < morseString.length; i++) {
      const sym = morseString[i];
      if (sym === ".") {
        playMorseBeep(false, currentDelay);
        currentDelay += 0.16;
      } else if (sym === "-") {
        playMorseBeep(true, currentDelay);
        currentDelay += 0.32;
      } else if (sym === " ") {
        currentDelay += 0.25;
      }
    }

    setTimeout(() => {
      setIsPlayingAudio(false);
    }, currentDelay * 1000 + 300);
  };

  const cipherOptions: Array<{ id: CipherType; name: string; icon: string; desc: string }> = [
    { id: "emoji", name: "Sandi Emoji", icon: "🐱🍎", desc: "Huruf diubah jadi gambar emoji lucu" },
    { id: "binary", name: "Sandi Biner Komputer", icon: "💡🤖", desc: "Bahasa saklar 0 dan 1 (ASCII)" },
    { id: "morse", name: "Sandi Morse", icon: "📻⚡", desc: "Kode titik dan garis telegraf" },
    { id: "caesar", name: "Sandi Geser Caesar", icon: "🎡🗝️", desc: "Geser alfabet maju beberapa langkah" },
    { id: "reverse", name: "Sandi Cermin (Balik)", icon: "🪞🔄", desc: "Membaca kata dari belakang" },
    { id: "number", name: "Sandi Angka Alfabet", icon: "🔢🏷️", desc: "A=1, B=2, C=3, dst." },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-900/80 via-emerald-900/80 to-slate-900 border border-teal-500/30 rounded-3xl p-5 sm:p-6 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="text-4xl p-3 bg-teal-950/80 rounded-2xl border border-teal-600/40 animate-pulse">
            🧪
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black uppercase bg-teal-500/20 text-teal-300 border border-teal-500/40">
                Mode Bebas / Kreatif
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-yellow-500/20 text-yellow-300 border border-yellow-500/40">
                ✨ Eksperimen Kode Rahasia
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
              Laboratorium Mesin Sandi Agen Rahasia
            </h2>
            <p className="text-xs sm:text-sm text-teal-100 font-medium">
              Ketik nama kamu atau pesan rahasiamu, lalu ubah menjadi berbagai jenis sandi!
            </p>
          </div>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left column: Input & Cipher Selection */}
        <div className="lg:col-span-5 space-y-4">
          {/* Input Box */}
          <div className="bg-slate-900/80 border border-indigo-500/30 rounded-3xl p-5 shadow-lg">
            <label className="text-xs font-extrabold uppercase tracking-wider text-yellow-300 block mb-2">
              📝 Masukkan Pesan Rahasiamu:
            </label>
            <input
              type="text"
              value={inputText}
              maxLength={30}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ketik kata disini..."
              className="w-full bg-slate-950 border-2 border-indigo-500/40 focus:border-yellow-400 rounded-2xl px-4 py-3 text-lg font-black text-white uppercase placeholder-slate-600 outline-none transition shadow-inner"
            />
            <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2">
              <span>Maksimal 30 huruf</span>
              <div className="flex gap-1.5">
                {["KIKO", "ROBOT", "RAHASIA", "BINTANG"].map((suggest) => (
                  <button
                    key={suggest}
                    onClick={() => {
                      playPop();
                      setInputText(suggest);
                    }}
                    className="text-[10px] bg-slate-800 hover:bg-slate-700 text-indigo-300 px-2 py-0.5 rounded-lg font-bold"
                  >
                    +{suggest}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Cipher Type Selector */}
          <div className="bg-slate-900/80 border border-indigo-500/30 rounded-3xl p-5 shadow-lg space-y-2.5">
            <label className="text-xs font-extrabold uppercase tracking-wider text-cyan-300 block mb-1">
              ⚙️ Pilih Mesin Enkoder:
            </label>

            <div className="space-y-2">
              {cipherOptions.map((opt) => {
                const isSelected = cipherType === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => {
                      playPop();
                      setCipherType(opt.id);
                    }}
                    className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? "bg-gradient-to-r from-indigo-600/80 to-purple-600/80 border-yellow-400 shadow-md shadow-purple-500/20 scale-[1.01]"
                        : "bg-slate-950/60 border-slate-800 hover:bg-slate-800/60"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{opt.icon}</span>
                      <div>
                        <div className={`font-black text-sm ${isSelected ? "text-yellow-300" : "text-white"}`}>
                          {opt.name}
                        </div>
                        <div className="text-[11px] text-slate-400">{opt.desc}</div>
                      </div>
                    </div>

                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      isSelected ? "border-yellow-400 bg-yellow-400" : "border-slate-700"
                    }`}>
                      {isSelected && <div className="w-2 h-2 rounded-full bg-slate-950" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Caesar shift slider if caesar selected */}
            {cipherType === "caesar" && (
              <div className="mt-3 p-3 bg-amber-950/40 border border-amber-500/40 rounded-2xl animate-in fade-in">
                <div className="flex items-center justify-between text-xs font-bold text-amber-300 mb-1">
                  <span>Jarak Geser Caesar:</span>
                  <span className="text-yellow-400 font-black text-sm">+{caesarShift} Langkah</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={caesarShift}
                  onChange={(e) => setCaesarShift(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>
            )}
          </div>
        </div>

        {/* Right column: Interactive Machine Visualizer & Output */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900/90 border border-teal-500/30 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between min-h-[420px]">
            {/* Visual Transformation Pipe */}
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-teal-400" />
                  <span className="font-black text-sm text-white">
                    Pabrik Enkoder Detektif: Teks ➡️ Sandi
                  </span>
                </div>
                <span className="text-xs px-2.5 py-0.5 bg-teal-500/20 text-teal-300 border border-teal-500/40 rounded-full font-bold">
                  Status: Siap Mengirim 📡
                </span>
              </div>

              {/* Before & After Cards */}
              <div className="space-y-4">
                <div>
                  <span className="text-xs font-bold text-slate-400 block mb-1">
                    1. Pesan Manusia Asli (Plaintext):
                  </span>
                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-2xl font-black text-lg text-yellow-300 tracking-wide">
                    &quot;{inputText || "(Ketik sesuatu di sebelah kiri)"}&quot;
                  </div>
                </div>

                <div className="flex justify-center my-1">
                  <div className="px-4 py-1.5 bg-gradient-to-r from-purple-700 to-indigo-700 text-white rounded-xl text-xs font-mono font-bold flex items-center gap-2 shadow animate-pulse">
                    <span>⚙️ DIPROSES OLEH MESIN ENCODER</span>
                    <span>⬇️</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-teal-300">
                      2. Hasil Kode Rahasia (Encoded Cipher):
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Format: {cipherType.toUpperCase()}
                    </span>
                  </div>

                  <div className="p-4 bg-slate-950 border-2 border-teal-500/50 rounded-2xl min-h-[90px] flex items-center justify-center shadow-inner relative overflow-hidden">
                    <div className="text-xl sm:text-2xl font-black text-cyan-300 text-center break-all select-all leading-relaxed">
                      {outputCode || "(Hasil sandi akan muncul di sini)"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Bar: Copy & Morse Play */}
            <div className="pt-4 border-t border-slate-800 mt-6 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {cipherType === "morse" && (
                  <button
                    onClick={playMorseAudio}
                    disabled={isPlayingAudio || !inputText}
                    className="px-4 py-2.5 bg-yellow-500 hover:bg-yellow-400 disabled:opacity-50 text-slate-950 font-black rounded-xl text-xs sm:text-sm flex items-center gap-2 transition cursor-pointer shadow-lg shadow-yellow-500/20"
                  >
                    <Volume2 className={`w-4 h-4 ${isPlayingAudio ? "animate-spin" : ""}`} />
                    <span>{isPlayingAudio ? "Memutar Bip..." : "🔊 Putar Bunyi Morse"}</span>
                  </button>
                )}

                <button
                  onClick={handleCopy}
                  className="px-4 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center gap-2 transition cursor-pointer shadow"
                >
                  {copied ? <Check className="w-4 h-4 text-green-300" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? "Tersalin ke Clipboard! ✓" : "Salin Kode Rahasia"}</span>
                </button>
              </div>

              <span className="text-xs text-indigo-300 font-medium">
                Kirim kode ini ke teman/orang tuamu! ✉️
              </span>
            </div>
          </div>

          {/* Educational Fun Facts for Kids */}
          <div className="p-4 bg-gradient-to-r from-indigo-950/60 to-purple-950/60 border border-indigo-500/20 rounded-2xl text-xs text-indigo-200 space-y-1">
            <span className="font-extrabold text-yellow-300 block mb-0.5">
              💡 Tahukah Kamu di Kehidupan Nyata?
            </span>
            <p>
              • <strong>Barcode &amp; QR Code</strong> di supermarket adalah bentuk encoding grafis untuk angka harga barang.
            </p>
            <p>
              • <strong>File MP3 &amp; Lagu</strong> di HP adalah encoding dari getaran gelombang suara ke angka 0 dan 1.
            </p>
            <p>
              • <strong>Foto &amp; Video</strong> di kamera di-encode menjadi jutaan angka warna piksel (Merah, Hijau, Biru).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

