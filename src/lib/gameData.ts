// Data & Utilitas Game Detektif Kode

export interface EmojiMapping {
  char: string;
  emoji: string;
  name: string;
}

export const EMOJI_DICTIONARY: Record<string, { emoji: string; name: string }> = {
  A: { emoji: "🍎", name: "Apel" },
  B: { emoji: "🎈", name: "Balon" },
  C: { emoji: "🐱", name: "Cilukba Cat" },
  D: { emoji: "🍩", name: "Donat" },
  E: { emoji: "🐘", name: "Gajah (Elephant)" },
  F: { emoji: "🍟", name: "Fries Kentang" },
  G: { emoji: "🎸", name: "Gitar" },
  H: { emoji: "🏠", name: "House / Rumah" },
  I: { emoji: "🍦", name: "Ice Cream" },
  J: { emoji: "🧃", name: "Jus Buah" },
  K: { emoji: "👑", name: "Mahkota Raja (King)" },
  L: { emoji: "🍋", name: "Lemon" },
  M: { emoji: "🌙", name: "Moon / Bulan" },
  N: { emoji: "🥜", name: "Nut / Kacang" },
  O: { emoji: "🍊", name: "Orange / Jeruk" },
  P: { emoji: "🍕", name: "Pizza" },
  Q: { emoji: "👸", name: "Ratu (Queen)" },
  R: { emoji: "🚀", name: "Roket" },
  S: { emoji: "⭐", name: "Star / Bintang" },
  T: { emoji: "🌴", name: "Tree / Pohon" },
  U: { emoji: "🦄", name: "Unicorn" },
  V: { emoji: "🎻", name: "Biola (Violin)" },
  W: { emoji: "🍉", name: "Semangka (Watermelon)" },
  X: { emoji: "❌", name: "Tanda Silang (X)" },
  Y: { emoji: "🪀", name: "Yoyo" },
  Z: { emoji: "🦓", name: "Zebra" },
};

export const MORSE_CODE: Record<string, string> = {
  A: ".-",
  B: "-...",
  C: "-.-.",
  D: "-..",
  E: ".",
  F: "..-.",
  G: "--.",
  H: "....",
  I: "..",
  J: ".---",
  K: "-.-",
  L: ".-..",
  M: "--",
  N: "-.",
  O: "---",
  P: ".--.",
  Q: "--.-",
  R: ".-.",
  S: "...",
  T: "-",
  U: "..-",
  V: "...-",
  W: ".--",
  X: "-..-",
  Y: "-.--",
  Z: "--..",
  " ": "/",
  "0": "-----",
  "1": ".----",
  "2": "..---",
  "3": "...--",
  "4": "....-",
  "5": ".....",
  "6": "-....",
  "7": "--...",
  "8": "---..",
  "9": "----.",
};

// Soal Misi untuk Level 1: Sandi Emoji
export interface EmojiMission {
  id: number;
  word: string;
  clue: string;
  type: "decode" | "encode"; // decode: lihat emoji -> tebak huruf; encode: lihat huruf -> susun emoji
  narrative: string;
}

export const EMOJI_MISSIONS: EmojiMission[] = [
  {
    id: 1,
    word: "KUCING",
    clue: "Hewan berbulu yang suka mengeong: 'Meong!'",
    type: "decode",
    narrative: "Detektif Kiko menemukan surat rahasia berbau ikan tuna!",
  },
  {
    id: 2,
    word: "ROKET",
    clue: "Kendaraan luar angkasa yang meluncur kencang ke bulan!",
    type: "encode",
    narrative: "Bibo perlu bahan bakar roket! Kirimkan kode rahasianya!",
  },
  {
    id: 3,
    word: "PIZZA",
    clue: "Makanan bundar lezat dari Italia bertabur keju!",
    type: "decode",
    narrative: "Pesan makan siang agen rahasia terselubung dalam kode emoji!",
  },
  {
    id: 4,
    word: "BINTANG",
    clue: "Benda langit bercahaya kelap-kelip di malam hari!",
    type: "encode",
    narrative: "Bibo butuh panduan navigasi bintang di galaksi!",
  },
  {
    id: 5,
    word: "ROBOT",
    clue: "Mesin pintar sahabat manusia yang suka bunyi 'Bip bop'!",
    type: "decode",
    narrative: "Identitas rekan detektif kita ada di kode ini!",
  },
];

// Soal Misi untuk Level 2: Sandi Biner Lampu
export interface BinaryMission {
  id: number;
  letter: string;
  val: number; // 1 to 26
  hint: string;
  narrative: string;
}

export const BINARY_MISSIONS: BinaryMission[] = [
  {
    id: 1,
    letter: "A",
    val: 1, // 00001
    hint: "Huruf pertama dalam alfabet! Hanya perlu 1 lampu nilai paling kecil menyala.",
    narrative: "Robot Bibo baru bangun dan menyalakan lampu pertamanya!",
  },
  {
    id: 2,
    letter: "B",
    val: 2, // 00010
    hint: "Huruf ke-2. Lampu dengan angka 2 harus menyala!",
    narrative: "Bibo mau mengirim inisial namanya: B!",
  },
  {
    id: 3,
    letter: "C",
    val: 3, // 00011 (1 + 2 = 3)
    hint: "Huruf ke-3! Gabungkan lampu angka 2 dan angka 1 (2 + 1 = 3).",
    narrative: "Bibo menggabungkan dua saklar untuk membuat huruf C!",
  },
  {
    id: 4,
    letter: "D",
    val: 4, // 00100
    hint: "Huruf ke-4! Cukup nyalakan lampu saklar 4 saja.",
    narrative: "Kunci pintu laboratorium menggunakan kode biner huruf D!",
  },
  {
    id: 5,
    letter: "E",
    val: 5, // 00101 (4 + 1 = 5)
    hint: "Huruf ke-5! Gabungkan lampu 4 dan 1 (4 + 1 = 5).",
    narrative: "Energi darurat robot membutuhkan sinyal huruf E!",
  },
];

// Soal Misi untuk Level 3: Sandi Geser (Caesar Cipher)
export interface CaesarMission {
  id: number;
  plain: string;
  shift: number;
  cipher: string;
  hint: string;
  narrative: string;
}

export const CAESAR_MISSIONS: CaesarMission[] = [
  {
    id: 1,
    plain: "HAI",
    shift: 1,
    cipher: "IBJ",
    hint: "Geser setiap huruf maju 1 langkah: H ➡️ I, A ➡️ B, I ➡️ J",
    narrative: "Sapaan rahasia antar agen diproteksi dengan geser 1 langkah!",
  },
  {
    id: 2,
    plain: "KUCING",
    shift: 1,
    cipher: "LVDJOH",
    hint: "Geser maju 1 langkah di roda kode!",
    narrative: "Nama sandi agen Kiko disamarkan!",
  },
  {
    id: 3,
    plain: "AMAN",
    shift: 2,
    cipher: "COCP",
    hint: "Geser setiap huruf maju 2 langkah: A (+2) ➡️ C, M (+2) ➡️ O...",
    narrative: "Laporan bahwa markas detektif dalam kondisi AMAN!",
  },
  {
    id: 4,
    plain: "BISA",
    shift: 3,
    cipher: "ELVD",
    hint: "Geser maju 3 langkah menggunakan roda putar rahasia!",
    narrative: "Sandi penyemangat: 'Kita BISA memecahkan semua kode!'",
  },
];

