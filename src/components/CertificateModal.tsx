"use client";

import React, { useState, useRef } from "react";
import { X, Award, Sparkles, Printer, Download, CheckCircle } from "lucide-react";
import { playPop, playSuccess, playVictory } from "@/lib/sound";

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  stars: number;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ isOpen, onClose, stars }) => {
  const [agentName, setAgentName] = useState("Detektif Hebat");
  const [agentBadge, setAgentBadge] = useState("🕵️‍♂️");
  const [isDownloading, setIsDownloading] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);

  if (!isOpen) return null;

  // Helper untuk membungkus baris teks di canvas
  const wrapText = (
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number
  ): number => {
    const words = text.split(" ");
    let line = "";
    let currentY = y;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + " ";
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        ctx.fillText(line.trim(), x, currentY);
        line = words[n] + " ";
        currentY += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line.trim(), x, currentY);
    return currentY + lineHeight;
  };

  // Fungsi Langsung Download Gambar Sertifikat (PNG)
  const handleDownload = () => {
    setIsDownloading(true);
    playSuccess();

    try {
      const width = 1400;
      const height = 980;
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        setIsDownloading(false);
        return;
      }

      // 1. Background Cream Vintage Parchment
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, "#fffef5");
      bgGrad.addColorStop(1, "#fef3c7");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Ornate Double Gold Borders
      ctx.strokeStyle = "#b45309"; // Amber 700
      ctx.lineWidth = 8;
      ctx.strokeRect(30, 30, width - 60, height - 60);

      ctx.strokeStyle = "#f59e0b"; // Amber 500
      ctx.lineWidth = 3;
      ctx.strokeRect(45, 45, width - 90, height - 90);

      // 3. Corner Ornaments ⚜️
      ctx.font = "36px serif";
      ctx.fillStyle = "#b45309";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("⚜️", 75, 75);
      ctx.fillText("⚜️", width - 75, 75);
      ctx.fillText("⚜️", 75, height - 75);
      ctx.fillText("⚜️", width - 75, height - 75);

      // 4. Badge Emoji
      ctx.font = "72px 'Segoe UI Emoji', 'Apple Color Emoji', 'Noto Color Emoji', sans-serif";
      ctx.fillText(agentBadge, width / 2, 130);

      // 5. Header Subtitle
      ctx.font = "bold 20px 'Segoe UI', system-ui, sans-serif";
      ctx.fillStyle = "#92400e"; // Amber 800
      ctx.letterSpacing = "4px";
      ctx.fillText("AKADEMI SANDI SIBER CILIK", width / 2, 205);
      ctx.letterSpacing = "0px";

      // 6. Main Title
      ctx.font = "900 38px 'Segoe UI', system-ui, sans-serif";
      ctx.fillStyle = "#0f172a"; // Slate 900
      ctx.fillText("SERTIFIKAT KELULUSAN DETEKTIF KODE", width / 2, 260);

      // 7. Recipient Introduction
      ctx.font = "italic 22px 'Segoe UI', system-ui, sans-serif";
      ctx.fillStyle = "#475569"; // Slate 600
      ctx.fillText("Diberikan dengan penuh kebanggaan kepada:", width / 2, 320);

      // 8. Name of Child
      const displayName = agentName.trim() || "Agen Rahasia";
      ctx.font = "bold 52px 'Georgia', serif";
      ctx.fillStyle = "#1e1b4b"; // Indigo 950
      ctx.fillText(displayName, width / 2, 400);

      // Decorative Line under Name
      ctx.strokeStyle = "#d97706";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(width / 2 - 320, 435);
      ctx.lineTo(width / 2 + 320, 435);
      ctx.stroke();

      // 9. Description Text
      ctx.font = "22px 'Segoe UI', system-ui, sans-serif";
      ctx.fillStyle = "#334155";
      const desc =
        "Telah berhasil mempelajari dan menguasai konsep dasar ENCODING (Mengubah Pesan Jadi Kode) & DECODING (Menerjemahkan Kode Kembali) melalui Sandi Emoji, Sandi Lampu Biner 0 & 1, dan Sandi Geser Caesar.";
      wrapText(ctx, desc, width / 2, 495, 980, 36);

      // 10. Golden Medallion / Official Seal
      const sealX = width / 2;
      const sealY = 660;
      ctx.beginPath();
      ctx.arc(sealX, sealY, 48, 0, Math.PI * 2);
      ctx.fillStyle = "#fbbf24";
      ctx.fill();
      ctx.strokeStyle = "#d97706";
      ctx.lineWidth = 4;
      ctx.stroke();

      ctx.font = "40px sans-serif";
      ctx.fillText("⭐", sealX, sealY);

      ctx.font = "bold 13px 'Segoe UI', sans-serif";
      ctx.fillStyle = "#78350f";
      ctx.fillText("LULUS RESMI", sealX, sealY + 68);

      // 11. Footer Signatures & Stars
      // Left side: Stars
      ctx.textAlign = "left";
      ctx.font = "bold 24px 'Segoe UI', sans-serif";
      ctx.fillStyle = "#854d0e";
      ctx.fillText(`⭐ ${stars} Bintang Diraih`, 120, height - 130);

      ctx.font = "16px 'Segoe UI', sans-serif";
      ctx.fillStyle = "#64748b";
      ctx.fillText("Peringkat: Agen Detektif Handal", 120, height - 98);

      // Right side: Mentor Signatures
      ctx.textAlign = "right";
      ctx.font = "bold 24px 'Segoe UI', sans-serif";
      ctx.fillStyle = "#0f172a";
      ctx.fillText("Detektif Kiko & Robot Bibo 🤖", width - 120, height - 130);

      ctx.font = "16px 'Segoe UI', sans-serif";
      ctx.fillStyle = "#64748b";
      ctx.fillText("Mentor Akademi Sandi Rahasia", width - 120, height - 98);

      // Trigger Instant Download
      const dataUrl = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      const sanitizedName = displayName.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase();
      a.download = `sertifikat-detektif-${sanitizedName || "kode"}.png`;
      a.href = dataUrl;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      playVictory();
    } catch (err) {
      console.error("Gagal mendownload sertifikat:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  // Fungsi Cetak (Print) - Hanya mencetak card sertifikat
  const handlePrint = () => {
    playSuccess();
    window.print();
  };

  return (
    <>
      {/* CSS Khusus Print: HANYA menampilkan card #printable-certificate */}
      <style jsx global>{`
        @media print {
          /* Sembunyikan semua elemen di halaman */
          body * {
            visibility: hidden !important;
          }

          /* Tampilkan HANYA card sertifikat dan seluruh isinya */
          #printable-certificate,
          #printable-certificate * {
            visibility: visible !important;
          }

          /* Atur posisi card pas di tengah kertas cetak */
          #printable-certificate {
            position: fixed !important;
            left: 50% !important;
            top: 50% !important;
            transform: translate(-50%, -50%) !important;
            width: 95% !important;
            max-width: 900px !important;
            margin: 0 auto !important;
            box-shadow: none !important;
            border: 4px double #b45309 !important;
            background: #fffbeb !important;
            color: #0f172a !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            z-index: 999999 !important;
            padding: 2.5rem !important;
          }

          /* Sembunyikan scrollbar dan latar */
          html, body {
            background: #ffffff !important;
            height: 100% !important;
            overflow: visible !important;
          }
        }
      `}</style>

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in duration-200">
        <div className="relative w-full max-w-2xl bg-gradient-to-b from-slate-900 to-indigo-950 border-2 border-yellow-500/50 rounded-3xl p-6 sm:p-8 text-white shadow-2xl max-h-[92vh] overflow-y-auto">
          {/* Tombol Tutup */}
          <button
            onClick={() => {
              playPop();
              onClose();
            }}
            className="absolute top-4 right-4 p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full transition cursor-pointer"
            title="Tutup"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Form Input Nama & Pilihan Lencana */}
          <div className="mb-5">
            <label className="text-xs font-bold text-yellow-300 uppercase tracking-wider block mb-1.5">
              ✏️ Tulis Nama Detektif Kamu:
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={agentName}
                maxLength={24}
                onChange={(e) => setAgentName(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-700 focus:border-yellow-400 rounded-xl px-4 py-2 text-base font-bold text-white outline-none transition shadow-inner"
                placeholder="Ketik namamu..."
              />
              <div className="flex gap-1.5 self-center sm:self-auto">
                {["🕵️‍♂️", "🐱", "🤖", "🚀", "👑", "👩‍🦰"].map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => {
                      playPop();
                      setAgentBadge(emoji);
                    }}
                    className={`w-10 h-10 rounded-xl text-xl flex items-center justify-center cursor-pointer transition ${agentBadge === emoji
                      ? "bg-yellow-400 text-slate-950 scale-110 shadow-md font-bold"
                      : "bg-slate-800/80 hover:bg-slate-700 text-slate-300"
                      }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Card Sertifikat (Target Print & Download) */}
          <div
            id="printable-certificate"
            ref={cardRef}
            className="bg-gradient-to-b from-amber-50 to-yellow-100 text-slate-900 p-6 sm:p-8 rounded-3xl border-4 border-double border-yellow-600 shadow-2xl relative overflow-hidden text-center select-none"
          >
            {/* Watermark 4 Sudut */}
            <div className="absolute top-3 left-3 text-yellow-700/40 text-2xl font-serif">⚜️</div>
            <div className="absolute top-3 right-3 text-yellow-700/40 text-2xl font-serif">⚜️</div>
            <div className="absolute bottom-3 left-3 text-yellow-700/40 text-2xl font-serif">⚜️</div>
            <div className="absolute bottom-3 right-3 text-yellow-700/40 text-2xl font-serif">⚜️</div>

            {/* Badge Icon */}
            <div className="text-5xl mb-1 animate-bounce" style={{ animationDuration: "3s" }}>
              {agentBadge}
            </div>

            {/* Header Sertifikat */}
            <h3 className="font-serif text-xs uppercase tracking-widest text-amber-800 font-extrabold mb-1">
              AKADEMI SANDI SIBER CILIK
            </h3>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-2">
              SERTIFIKAT KELULUSAN DETEKTIF KODE
            </h2>

            <p className="text-xs text-slate-600 italic mb-3">
              Diberikan dengan penuh kebanggaan kepada:
            </p>

            {/* Nama Detektif */}
            <div className="py-2 border-b-2 border-dashed border-amber-600/50 mb-3 max-w-md mx-auto">
              <span className="text-2xl sm:text-3xl font-black text-indigo-950 font-serif">
                {agentName.trim() || "Agen Rahasia"}
              </span>
            </div>

            {/* Deskripsi Pencapaian */}
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-lg mx-auto mb-4">
              Telah berhasil mempelajari dan menguasai konsep dasar <strong>ENCODING</strong> (Mengubah Pesan Jadi Kode) &amp; <strong>DECODING</strong> (Menerjemahkan Kode Kembali) melalui Sandi Emoji, Sandi Lampu Biner 0 &amp; 1, dan Sandi Geser Caesar.
            </p>

            {/* Tanda Tangan & Perolehan Bintang */}
            <div className="flex items-center justify-between pt-3 border-t border-amber-300/80 text-xs mt-2">
              <div className="text-left">
                <span className="block font-black text-amber-900 text-sm">⭐ {stars} Bintang Diraih</span>
                <span className="text-[11px] text-slate-600 font-medium">Peringkat: Agen Handal</span>
              </div>

              {/* Stempel Emas Tengah */}
              <div className="w-12 h-12 rounded-full bg-amber-400 border-2 border-amber-600 flex flex-col items-center justify-center shadow-inner">
                <span className="text-sm">⭐</span>
                <span className="text-[7px] font-black text-amber-950 uppercase">LULUS</span>
              </div>

              <div className="text-right">
                <span className="block font-bold text-slate-900">Detektif Kiko &amp; Bibo 🤖</span>
                <span className="text-[11px] text-slate-600 font-medium">Mentor Akademi Sandi Almamater Academy</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-6 pt-2 border-t border-slate-800">
            <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
              {/* Tombol Langsung Download Gambar PNG */}
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="flex-1 sm:flex-none px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 disabled:opacity-50 text-white rounded-xl text-xs sm:text-sm font-black flex items-center justify-center gap-2 transition cursor-pointer shadow-lg shadow-emerald-600/25 active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>{isDownloading ? "Menyiapkan File..." : "Unduh Sertifikat (PNG) 📥"}</span>
              </button>

              {/* Tombol Cetak / PDF */}
              <button
                onClick={handlePrint}
                className="flex-1 sm:flex-none px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition cursor-pointer shadow active:scale-95"
              >
                <Printer className="w-4 h-4" />
                <span>Cetak / PDF 🖨️</span>
              </button>
            </div>

            <button
              onClick={() => {
                playPop();
                onClose();
              }}
              className="w-full sm:w-auto px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs sm:text-sm font-bold cursor-pointer transition text-center"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
