"use client";

import React, { useState } from "react";
import { X, Award, Sparkles, Printer, CheckCircle } from "lucide-react";
import { playPop, playSuccess } from "@/lib/sound";

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  stars: number;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ isOpen, onClose, stars }) => {
  const [agentName, setAgentName] = useState("Detektif Hebat");
  const [agentBadge, setAgentBadge] = useState("🕵️‍♂️");

  if (!isOpen) return null;

  const handlePrint = () => {
    playSuccess();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-gradient-to-b from-slate-900 to-indigo-950 border-2 border-yellow-500/50 rounded-3xl p-6 sm:p-8 text-white shadow-2xl">
        <button
          onClick={() => {
            playPop();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Name input */}
        <div className="mb-4">
          <label className="text-xs font-bold text-yellow-300 uppercase block mb-1">
            Tulis Nama Detektif Kamu:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={agentName}
              maxLength={20}
              onChange={(e) => setAgentName(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-sm font-bold text-white outline-none focus:border-yellow-400"
              placeholder="Ketik namamu..."
            />
            <div className="flex gap-1">
              {["🕵️‍♂️", "🐱", "🤖", "🚀", "👑"].map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => {
                    playPop();
                    setAgentBadge(emoji);
                  }}
                  className={`w-9 h-9 rounded-xl text-lg flex items-center justify-center cursor-pointer transition ${
                    agentBadge === emoji ? "bg-yellow-400 text-slate-950 scale-110" : "bg-slate-800"
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Certificate Display Paper */}
        <div className="bg-gradient-to-b from-amber-50 to-yellow-100 text-slate-900 p-6 sm:p-8 rounded-2xl border-4 border-double border-yellow-600 shadow-xl relative overflow-hidden text-center print:border-black print:bg-white">
          {/* Watermark / Corners */}
          <div className="absolute top-2 left-2 text-yellow-600/30 text-2xl font-serif">⚜️</div>
          <div className="absolute top-2 right-2 text-yellow-600/30 text-2xl font-serif">⚜️</div>
          <div className="absolute bottom-2 left-2 text-yellow-600/30 text-2xl font-serif">⚜️</div>
          <div className="absolute bottom-2 right-2 text-yellow-600/30 text-2xl font-serif">⚜️</div>

          <div className="text-4xl mb-1">{agentBadge}</div>

          <h3 className="font-serif text-xs uppercase tracking-widest text-amber-800 font-extrabold mb-1">
            AKADEMI SANDI SIBER CILIK
          </h3>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-2">
            SERTIFIKAT KELULUSAN DETEKTIF KODE
          </h2>

          <p className="text-xs text-slate-600 italic mb-3">
            Diberikan dengan penuh kebanggaan kepada:
          </p>

          <div className="py-2 border-b-2 border-dashed border-amber-600/50 mb-3">
            <span className="text-2xl sm:text-3xl font-black text-indigo-950 font-serif">
              {agentName || "Agen Rahasia"}
            </span>
          </div>

          <p className="text-xs text-slate-700 leading-relaxed max-w-md mx-auto mb-4">
            Telah berhasil mempelajari dan menguasai konsep dasar <strong>ENCODING</strong> (Mengubah Pesan Jadi Kode) &amp; <strong>DECODING</strong> (Menerjemahkan Kode Kembali) melalui Sandi Emoji, Sandi Lampu Biner 0 &amp; 1, dan Sandi Geser Caesar.
          </p>

          <div className="flex items-center justify-between pt-2 border-t border-amber-300 text-xs">
            <div className="text-left">
              <span className="block font-bold text-slate-800">⭐ {stars} Bintang Diraih</span>
              <span className="text-[10px] text-slate-500">Peringkat: Agen Handal</span>
            </div>
            <div className="text-right">
              <span className="block font-bold text-slate-800">Detektif Kiko &amp; Bibo 🤖</span>
              <span className="text-[10px] text-slate-500">Mentor Akademi Sandi</span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center mt-5">
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak Sertifikat 🖨️</span>
          </button>
          <button
            onClick={() => {
              playPop();
              onClose();
            }}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs sm:text-sm font-bold cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

