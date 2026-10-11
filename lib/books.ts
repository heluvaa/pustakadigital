// Sumber data katalog ZFBOOK.
// Semua buku berasal dari sumber legal dan public domain (diverifikasi via API):
//  - Project Gutenberg (gutendex.com / gutenberg.org)
//  - Internet Archive (archive.org/metadata)
// Tidak ada file buku yang di-host di repo ini. Download & baca langsung dari sumber.
// Popularitas = jumlah unduhan di sumber (bukan rating).

export type Kategori = "Pengembangan Diri" | "Fiksi Klasik" | "Filosofi" | "Anak";
export type Bahasa = "id" | "en";
export type Sumber = "gutenberg" | "archive";

export type Buku = {
  slug: string;
  judul: string;
  penulis: string;
  tahun: number;
  bahasa: Bahasa;
  kategori: Kategori;
  sumber: Sumber;
  /** ID buku: Gutenberg numeric id, atau identifier archive.org */
  sumberId: string;
  /** Halaman sumber resmi */
  linkSumber: string;
  /** Link download langsung (EPUB/PDF). null bila format belum terverifikasi */
  linkEpub: string | null;
  linkPdf: string | null;
  /** Jumlah unduhan di sumber, dipakai sebagai skor popularitas */
  popularitas: number;
  deskripsi: string;
  /** Sampul dari Open Library Cover API (ISBN/OLID tidak dipakai; pakai IA identifier) */
  sampul: { tipe: "ia" | "olid"; id: string } | null;
};

export const KATEGORI: Kategori[] = ["Pengembangan Diri", "Fiksi Klasik", "Filosofi", "Anak"];

export const BUKU: Buku[] = [
  // ---- Fiksi Klasik (Inggris, Gutenberg) ----
  { slug: "pride-and-prejudice", judul: "Pride and Prejudice", penulis: "Jane Austen", tahun: 1813, bahasa: "en", kategori: "Fiksi Klasik", sumber: "gutenberg", sumberId: "1342", linkSumber: "https://www.gutenberg.org/ebooks/1342", linkEpub: "https://www.gutenberg.org/ebooks/1342.epub3.images", linkPdf: null, popularitas: 190246, deskripsi: "Elizabeth Bennet dan Mr. Darcy: prasangka, gengsi, dan cinta di Inggris abad ke-19.", sampul: null },
  { slug: "moby-dick", judul: "Moby Dick; Or, The Whale", penulis: "Herman Melville", tahun: 1851, bahasa: "en", kategori: "Fiksi Klasik", sumber: "gutenberg", sumberId: "2701", linkSumber: "https://www.gutenberg.org/ebooks/2701", linkEpub: "https://www.gutenberg.org/ebooks/2701.epub3.images", linkPdf: null, popularitas: 168246, deskripsi: "Kapten Ahab memburu paus putih raksasa. Epik tentang obsesi dan takdir.", sampul: null },
  { slug: "frankenstein", judul: "Frankenstein; or, the Modern Prometheus", penulis: "Mary Wollstonecraft Shelley", tahun: 1818, bahasa: "en", kategori: "Fiksi Klasik", sumber: "gutenberg", sumberId: "84", linkSumber: "https://www.gutenberg.org/ebooks/84", linkEpub: "https://www.gutenberg.org/ebooks/84.epub3.images", linkPdf: null, popularitas: 144008, deskripsi: "Victor Frankenstein dan makhluk ciptaannya. Fondasi fiksi ilmiah modern.", sampul: null },
  { slug: "sherlock-holmes", judul: "The Adventures of Sherlock Holmes", penulis: "Sir Arthur Conan Doyle", tahun: 1892, bahasa: "en", kategori: "Fiksi Klasik", sumber: "gutenberg", sumberId: "1661", linkSumber: "https://www.gutenberg.org/ebooks/1661", linkEpub: "https://www.gutenberg.org/ebooks/1661.epub3.images", linkPdf: null, popularitas: 96353, deskripsi: "Kumpulan kasus detektif Sherlock Holmes dan dr. Watson.", sampul: null },
  { slug: "romeo-and-juliet", judul: "Romeo and Juliet", penulis: "William Shakespeare", tahun: 1597, bahasa: "en", kategori: "Fiksi Klasik", sumber: "gutenberg", sumberId: "1513", linkSumber: "https://www.gutenberg.org/ebooks/1513", linkEpub: "https://www.gutenberg.org/ebooks/1513.epub3.images", linkPdf: null, popularitas: 81893, deskripsi: "Tragedi dua remaja dari keluarga yang bermusuhan di Verona.", sampul: null },
  { slug: "dracula", judul: "Dracula", penulis: "Bram Stoker", tahun: 1897, bahasa: "en", kategori: "Fiksi Klasik", sumber: "gutenberg", sumberId: "345", linkSumber: "https://www.gutenberg.org/ebooks/345", linkEpub: "https://www.gutenberg.org/ebooks/345.epub3.images", linkPdf: null, popularitas: 78131, deskripsi: "Count Dracula dan para pemburunya. Novel horor epistolary.", sampul: null },
  { slug: "crime-and-punishment", judul: "Crime and Punishment", penulis: "Fyodor Dostoyevsky", tahun: 1866, bahasa: "en", kategori: "Fiksi Klasik", sumber: "gutenberg", sumberId: "2554", linkSumber: "https://www.gutenberg.org/ebooks/2554", linkEpub: "https://www.gutenberg.org/ebooks/2554.epub3.images", linkPdf: null, popularitas: 76289, deskripsi: "Raskolnikov, mahasiswa miskin yang membunuh, dan konsekuensi moralnya.", sampul: null },
  { slug: "jekyll-and-hyde", judul: "The Strange Case of Dr. Jekyll and Mr. Hyde", penulis: "Robert Louis Stevenson", tahun: 1886, bahasa: "en", kategori: "Fiksi Klasik", sumber: "gutenberg", sumberId: "43", linkSumber: "https://www.gutenberg.org/ebooks/43", linkEpub: "https://www.gutenberg.org/ebooks/43.epub3.images", linkPdf: null, popularitas: 71859, deskripsi: "Dualitas kebaikan dan kejahatan dalam satu manusia.", sampul: null },
  { slug: "middlemarch", judul: "Middlemarch", penulis: "George Eliot", tahun: 1871, bahasa: "en", kategori: "Fiksi Klasik", sumber: "gutenberg", sumberId: "145", linkSumber: "https://www.gutenberg.org/ebooks/145", linkEpub: "https://www.gutenberg.org/ebooks/145.epub3.images", linkPdf: null, popularitas: 70535, deskripsi: "Potret kehidupan provinsi Inggris: ambisi, pernikahan, dan idealisme.", sampul: null },
  { slug: "little-women", judul: "Little Women", penulis: "Louisa May Alcott", tahun: 1868, bahasa: "en", kategori: "Fiksi Klasik", sumber: "gutenberg", sumberId: "37106", linkSumber: "https://www.gutenberg.org/ebooks/37106", linkEpub: "https://www.gutenberg.org/ebooks/37106.epub3.images", linkPdf: null, popularitas: 66570, deskripsi: "Empat kakak-beradik March tumbuh dewasa di masa Perang Saudara Amerika.", sampul: null },
  { slug: "jane-eyre", judul: "Jane Eyre", penulis: "Charlotte Brontë", tahun: 1847, bahasa: "en", kategori: "Fiksi Klasik", sumber: "gutenberg", sumberId: "1260", linkSumber: "https://www.gutenberg.org/ebooks/1260", linkEpub: "https://www.gutenberg.org/ebooks/1260.epub3.images", linkPdf: null, popularitas: 57519, deskripsi: "Kisah Jane Eyre, gadis yatim yang menjadi governess di Thornfield Hall.", sampul: null },
  { slug: "dorian-gray", judul: "The Picture of Dorian Gray", penulis: "Oscar Wilde", tahun: 1890, bahasa: "en", kategori: "Fiksi Klasik", sumber: "gutenberg", sumberId: "174", linkSumber: "https://www.gutenberg.org/ebooks/174", linkEpub: "https://www.gutenberg.org/ebooks/174.epub3.images", linkPdf: null, popularitas: 52851, deskripsi: "Dorian yang tetap muda sementara lukisannya menanggung dosa-dosanya.", sampul: null },
  { slug: "monte-cristo", judul: "The Count of Monte Cristo", penulis: "Alexandre Dumas", tahun: 1844, bahasa: "en", kategori: "Fiksi Klasik", sumber: "gutenberg", sumberId: "1184", linkSumber: "https://www.gutenberg.org/ebooks/1184", linkEpub: "https://www.gutenberg.org/ebooks/1184.epub3.images", linkPdf: null, popularitas: 52008, deskripsi: "Edmond Dantès dibui secara tidak adil, lalu kembali membalas dendam.", sampul: null },
  { slug: "tale-of-two-cities", judul: "A Tale of Two Cities", penulis: "Charles Dickens", tahun: 1859, bahasa: "en", kategori: "Fiksi Klasik", sumber: "gutenberg", sumberId: "98", linkSumber: "https://www.gutenberg.org/ebooks/98", linkEpub: "https://www.gutenberg.org/ebooks/98.epub3.images", linkPdf: null, popularitas: 50704, deskripsi: "London dan Paris di masa Revolusi Prancis.", sampul: null },
  { slug: "great-gatsby", judul: "The Great Gatsby", penulis: "F. Scott Fitzgerald", tahun: 1925, bahasa: "en", kategori: "Fiksi Klasik", sumber: "gutenberg", sumberId: "64317", linkSumber: "https://www.gutenberg.org/ebooks/64317", linkEpub: "https://www.gutenberg.org/ebooks/64317.epub3.images", linkPdf: null, popularitas: 50662, deskripsi: "Jay Gatsby dan mimpi Amerika di era Jazz.", sampul: null },
  { slug: "metamorphosis", judul: "The Metamorphosis", penulis: "Franz Kafka", tahun: 1915, bahasa: "en", kategori: "Fiksi Klasik", sumber: "gutenberg", sumberId: "5200", linkSumber: "https://www.gutenberg.org/ebooks/5200", linkEpub: "https://www.gutenberg.org/ebooks/5200.epub3.images", linkPdf: null, popularitas: 47449, deskripsi: "Gregor Samsa bangun menjadi serangga raksasa.", sampul: null },
  { slug: "yellow-wallpaper", judul: "The Yellow Wallpaper", penulis: "Charlotte Perkins Gilman", tahun: 1892, bahasa: "en", kategori: "Fiksi Klasik", sumber: "gutenberg", sumberId: "1952", linkSumber: "https://www.gutenberg.org/ebooks/1952", linkEpub: "https://www.gutenberg.org/ebooks/1952.epub3.images", linkPdf: null, popularitas: 46806, deskripsi: "Cerita pendek tentang isolasi dan kesehatan mental perempuan.", sampul: null },

  // ---- Anak (Inggris, Gutenberg) ----
  { slug: "alice-in-wonderland", judul: "Alice's Adventures in Wonderland", penulis: "Lewis Carroll", tahun: 1865, bahasa: "en", kategori: "Anak", sumber: "gutenberg", sumberId: "11", linkSumber: "https://www.gutenberg.org/ebooks/11", linkEpub: "https://www.gutenberg.org/ebooks/11.epub3.images", linkPdf: null, popularitas: 121623, deskripsi: "Alice jatuh ke lubang kelinci dan menemukan dunia yang aneh.", sampul: null },
  { slug: "wizard-of-oz", judul: "The Wonderful Wizard of Oz", penulis: "L. Frank Baum", tahun: 1900, bahasa: "en", kategori: "Anak", sumber: "gutenberg", sumberId: "55", linkSumber: "https://www.gutenberg.org/ebooks/55", linkEpub: "https://www.gutenberg.org/ebooks/55.epub3.images", linkPdf: null, popularitas: 38574, deskripsi: "Dorothy dan teman-temannya menuju Kota Zamrud.", sampul: null },
  { slug: "peter-pan", judul: "Peter Pan and Wendy", penulis: "J. M. Barrie", tahun: 1911, bahasa: "en", kategori: "Anak", sumber: "gutenberg", sumberId: "16", linkSumber: "https://www.gutenberg.org/ebooks/16", linkEpub: "https://www.gutenberg.org/ebooks/16.epub3.images", linkPdf: null, popularitas: 25701, deskripsi: "Peter Pan yang tak pernah mau dewasa dan Negeri Dongeng.", sampul: null },
  { slug: "jungle-book", judul: "The Jungle Book", penulis: "Rudyard Kipling", tahun: 1894, bahasa: "en", kategori: "Anak", sumber: "gutenberg", sumberId: "236", linkSumber: "https://www.gutenberg.org/ebooks/236", linkEpub: "https://www.gutenberg.org/ebooks/236.epub3.images", linkPdf: null, popularitas: 18135, deskripsi: "Mowgli, anak manusia yang dibesarkan serigala di hutan India.", sampul: null },
  { slug: "oliver-twist", judul: "Oliver Twist", penulis: "Charles Dickens", tahun: 1838, bahasa: "en", kategori: "Anak", sumber: "gutenberg", sumberId: "730", linkSumber: "https://www.gutenberg.org/ebooks/730", linkEpub: "https://www.gutenberg.org/ebooks/730.epub3.images", linkPdf: null, popularitas: 16142, deskripsi: "Yatim piatu London yang terjerat sindikat pencuri.", sampul: null },

  // ---- Filosofi (Inggris, Gutenberg) ----
  { slug: "meditations", judul: "Meditations", penulis: "Marcus Aurelius", tahun: 180, bahasa: "en", kategori: "Filosofi", sumber: "gutenberg", sumberId: "2680", linkSumber: "https://www.gutenberg.org/ebooks/2680", linkEpub: "https://www.gutenberg.org/ebooks/2680.epub3.images", linkPdf: null, popularitas: 50637, deskripsi: "Catatan pribadi Kaisar Marcus Aurelius tentang Stoicisme.", sampul: null },
  { slug: "the-prince", judul: "The Prince", penulis: "Niccolò Machiavelli", tahun: 1532, bahasa: "en", kategori: "Filosofi", sumber: "gutenberg", sumberId: "1232", linkSumber: "https://www.gutenberg.org/ebooks/1232", linkEpub: "https://www.gutenberg.org/ebooks/1232.epub3.images", linkPdf: null, popularitas: 45102, deskripsi: "Panduan kekuasaan politik untuk penguasa.", sampul: null },
  { slug: "the-republic", judul: "The Republic", penulis: "Plato", tahun: -375, bahasa: "en", kategori: "Filosofi", sumber: "gutenberg", sumberId: "1497", linkSumber: "https://www.gutenberg.org/ebooks/1497", linkEpub: "https://www.gutenberg.org/ebooks/1497.epub3.images", linkPdf: null, popularitas: 26842, deskripsi: "Dialog tentang keadilan dan negara ideal.", sampul: null },

  // ---- Indonesia (Internet Archive, format terverifikasi) ----
  { slug: "madilog", judul: "MADILOG", penulis: "Tan Malaka", tahun: 1943, bahasa: "id", kategori: "Filosofi", sumber: "archive", sumberId: "MADILOG", linkSumber: "https://archive.org/details/MADILOG", linkEpub: "https://archive.org/download/MADILOG/MADILOG.epub", linkPdf: "https://archive.org/download/MADILOG/MADILOG.pdf", popularitas: 92117, deskripsi: "Materialisme, Dialektika, dan Logika. Karya filsafat Tan Malaka.", sampul: { tipe: "ia", id: "MADILOG" } },
  { slug: "gerpolek-tan-malaka", judul: "Gerpolek", penulis: "Tan Malaka", tahun: 1948, bahasa: "id", kategori: "Filosofi", sumber: "archive", sumberId: "gerpolek-tan-malaka", linkSumber: "https://archive.org/details/gerpolek-tan-malaka", linkEpub: "https://archive.org/download/gerpolek-tan-malaka/Gerpolek%20%E2%80%94%20Tan%20Malaka.epub", linkPdf: "https://archive.org/download/gerpolek-tan-malaka/Gerpolek%20%E2%80%94%20Tan%20Malaka.pdf", popularitas: 1156, deskripsi: "Gerilya Politik Ekonomi, strategi perjuangan Tan Malaka.", sampul: { tipe: "ia", id: "gerpolek-tan-malaka" } },
  { slug: "semangat-muda", judul: "Semangat Muda", penulis: "Tan Malaka", tahun: 1926, bahasa: "id", kategori: "Pengembangan Diri", sumber: "archive", sumberId: "semangat-muda-tan-malaka", linkSumber: "https://archive.org/details/semangat-muda-tan-malaka", linkEpub: "https://archive.org/download/semangat-muda-tan-malaka/Semangat%20Muda%20%E2%80%94%20Tan%20Malaka.epub", linkPdf: "https://archive.org/download/semangat-muda-tan-malaka/Semangat%20Muda%20%E2%80%94%20Tan%20Malaka.pdf", popularitas: 797, deskripsi: "Seruan kepada pemuda untuk bergerak dan berpikir mandiri.", sampul: { tipe: "ia", id: "semangat-muda-tan-malaka" } },
  { slug: "parlemen-atau-soviet", judul: "Parlemen atau Soviet", penulis: "Tan Malaka", tahun: 1921, bahasa: "id", kategori: "Filosofi", sumber: "archive", sumberId: "parlemen-atau-soviet-tan-malaka", linkSumber: "https://archive.org/details/parlemen-atau-soviet-tan-malaka", linkEpub: "https://archive.org/download/parlemen-atau-soviet-tan-malaka/Parlemen%20atau%20Soviet%20%E2%80%94%20Tan%20Malaka.epub", linkPdf: "https://archive.org/download/parlemen-atau-soviet-tan-malaka/Parlemen%20atau%20Soviet%20%E2%80%94%20Tan%20Malaka.pdf", popularitas: 758, deskripsi: "Tulisan Tan Malaka tentang bentuk pemerintahan rakyat.", sampul: { tipe: "ia", id: "parlemen-atau-soviet-tan-malaka" } },
  { slug: "rencana-ekonomi-berjuang", judul: "Rencana Ekonomi Berjuang", penulis: "Tan Malaka", tahun: 1945, bahasa: "id", kategori: "Filosofi", sumber: "archive", sumberId: "rencana-ekonomi-berjuang-tan-malaka", linkSumber: "https://archive.org/details/rencana-ekonomi-berjuang-tan-malaka", linkEpub: "https://archive.org/download/rencana-ekonomi-berjuang-tan-malaka/Rencana%20Ekonomi%20Berjuang%20%E2%80%94%20Tan%20Malaka.epub", linkPdf: "https://archive.org/download/rencana-ekonomi-berjuang-tan-malaka/Rencana%20Ekonomi%20Berjuang%20%E2%80%94%20Tan%20Malaka.pdf", popularitas: 498, deskripsi: "Gagasan ekonomi kerakyatan dari Tan Malaka.", sampul: { tipe: "ia", id: "rencana-ekonomi-berjuang-tan-malaka" } },
];

/** Teks polos (djvu.txt) untuk buku Internet Archive. Nama file diambil dari metadata archive.org. */
export const TEKS_IA: Record<string, string> = {
  MADILOG: "MADILOG/MADILOG_djvu.txt",
  "gerpolek-tan-malaka": "gerpolek-tan-malaka/Gerpolek — Tan Malaka_djvu.txt",
  "semangat-muda-tan-malaka": "semangat-muda-tan-malaka/Semangat Muda — Tan Malaka_djvu.txt",
  "parlemen-atau-soviet-tan-malaka": "parlemen-atau-soviet-tan-malaka/Parlemen atau Soviet — Tan Malaka_djvu.txt",
  "rencana-ekonomi-berjuang-tan-malaka": "rencana-ekonomi-berjuang-tan-malaka/Rencana Ekonomi Berjuang — Tan Malaka_djvu.txt",
};

export function bukuBySlug(slug: string): Buku | undefined {
  return BUKU.find((b) => b.slug === slug);
}

export function bukuTerurut(): Buku[] {
  return [...BUKU].sort((a, b) => b.popularitas - a.popularitas);
}
