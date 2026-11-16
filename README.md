# 🕵️‍♂️ Detektif Kode Rahasia (Secret Agent Code Breaker)

Game edukasi interaktif berbasis **Next.js** & **Tailwind CSS** yang dirancang khusus untuk memperkenalkan konsep dasar **Encoding & Decoding** kepada anak-anak dengan cara yang visual, ceria, dan menyenangkan!

---

## 🌟 Cerita & Karakter
Anak bermain sebagai **Agen Detektif Cilik** yang berpetualang bersama:
- **Detektif Kiko 🐱**: Kucing detektif ahli memecahkan pesan rahasia.
- **Robot Bibo 🤖**: Sahabat robot yang hanya mengerti bahasa listrik (0 dan 1).

---

## 🧠 Konsep Edukatif yang Diajarkan

1. **Apa itu ENCODING?**
   - Menjelaskan bahwa encoding adalah proses **mengubah pesan manusia menjadi kode rahasia** atau format yang bisa disimpan / dikirim dengan aman.
2. **Apa itu DECODING?**
   - Menjelaskan bahwa decoding adalah proses **menerjemahkan kembali kode rahasia** menjadi pesan yang bisa dimengerti menggunakan kamus kunci (*cipher key*).
3. **Mengapa Komputer Membutuhkannya?**
   - Komputer tidak membaca huruf langsung, melainkan bekerja dengan jutaan saklar listrik: **0 (Mati)** dan **1 (Nyala)**. Semua chat, game, dan musik harus di-encode ke biner!

---

## 🎮 4 Mode Permainan / Level

### 🐱 Level 1: Sandi Emoji (Substitusi Sederhana)
- Setiap huruf alfabet diwakili oleh simbol emoji lucu (A = 🍎, B = 🎈, K = 👑, dst).
- **Misi Decoding**: Anak melihat barisan emoji (misal: 🍕 🍦 🦓 🦓 🍎) dan mendekode hurufnya menjadi kata **"PIZZA"**.
- **Misi Encoding**: Anak menyusun barisan emoji untuk kata rahasia (misal: **"ROKET"**).
- Dilengkapi **Buku Kamus Kode** interaktif.

### 💡 Level 2: Sandi Lampu Biner (Bahasa Rahasia Robot)
- 5 bohlam lampu ajaib interaktif dengan nilai bobot bit: **16, 8, 4, 2, 1**.
- Anak dapat menyalakan saklar (1) atau mematikan saklar (0).
- Animasi lampu menyala bersinar (*glow*) dan perhitungan live penjumlahan bit:
  - Lampu 2 + Lampu 1 = Nilai 3 ➡️ Huruf **C**!
  - Lampu 4 + Lampu 1 = Nilai 5 ➡️ Huruf **E**!
- Robot Bibo memberikan tantangan untuk membentuk huruf-huruf alfabet.

### 🎡 Level 3: Sandi Geser Julius Caesar (Roda Kode Berputar)
- Belajar sejarah sandi rahasia tertua di dunia: menggeser alfabet sejumlah langkah rahasia (+1, +2, +3).
- **Cipher Ruler Interaktif**: Anak dapat menggeser tuas untuk melihat alfabet bergeser secara visual.
- Misi memecahkan pesan tersandi musuh dan mengembalikannya ke pesan asli.

### 🧪 Level 4: Laboratorium Mesin Sandi Bebas (Creative Sandbox)
- Anak bebas mengetik nama mereka sendiri atau kalimat apapun!
- Pilihan mesin enkripsi:
  - 🐱 Sandi Emoji
  - 💡 Sandi Biner Komputer (ASCII 8-bit)
  - 📻 Sandi Morse (Dilengkapi tombol **🔊 Putar Bunyi Morse Beep-Beep** sintetis Web Audio API!)
  - 🪞 Sandi Cermin / Terbalik
  - 🔢 Sandi Angka Posisi
- Tombol **Salin Kode Rahasia** untuk dibagikan ke teman atau orang tua.

### 🎓 Sertifikat Kelulusan Detektif Kode
- Anak mengumpulkan ⭐ Bintang dari setiap misi yang diselesaikan.
- Bisa mengisi nama sendiri dan memilih lencana avatar (🕵️‍♂️, 🐱, 🤖, 🚀, 👑).
- Tombol Cetak / Simpan Sertifikat resmi.

---

## 🚀 Cara Menjalankan Game

Masuk ke folder `detektif-kode`:

```bash
cd detektif-kode
```

Jalankan server pengembangan (*development server*):

```bash
npm run dev
```

Buka browser di alamat:
[http://localhost:3000](http://localhost:3000)

Untuk build produksi:
```bash
npm run build
npm run start
```

---

## 🛠️ Teknologi yang Digunakan
- **Next.js (App Router)**
- **React 19 & TypeScript**
- **Tailwind CSS v4**
- **Web Audio API** (Efek suara sintetis tanpa memerlukan download file audio eksternal)
- **HTML5 Canvas** (Efek partikel confetti selebrasi)
- **Lucide Icons**

