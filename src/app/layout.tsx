import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Detektif Kode Rahasia | Petualangan Encoding & Decoding",
  description: "Game edukasi seru untuk anak belajar konsep Encoding dan Decoding bersama Detektif Kucing & Robot Bibo!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-slate-950 text-slate-100 antialiased overflow-x-hidden selection:bg-yellow-400 selection:text-slate-900">
        {children}
      </body>
    </html>
  );
}

