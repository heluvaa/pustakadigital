import { TEKS_IA, type Buku } from "./books";

/** URL teks polos di sumber legal. null bila tidak ada teks yang terverifikasi. */
export function urlTeks(b: Buku): string | null {
  if (b.sumber === "gutenberg") {
    return `https://www.gutenberg.org/cache/epub/${b.sumberId}/pg${b.sumberId}.txt`;
  }
  const berkas = TEKS_IA[b.sumberId];
  if (!berkas) return null;
  return `https://archive.org/download/${berkas.split("/").map(encodeURIComponent).join("/")}`;
}

/** Buang header dan footer lisensi Project Gutenberg. */
export function bersihkanTeks(raw: string): string {
  let t = raw.replace(/\r\n/g, "\n").replace(/\uFEFF/g, "");
  const awal = t.search(/\*\*\*\s?START OF (THIS|THE) PROJECT GUTENBERG/i);
  if (awal >= 0) t = t.slice(t.indexOf("\n", awal) + 1);
  const akhir = t.search(/\*\*\*\s?END OF (THIS|THE) PROJECT GUTENBERG/i);
  if (akhir >= 0) t = t.slice(0, akhir);
  return t.trim();
}

/** Pecah teks jadi halaman, memotong di batas paragraf. */
export function pecahHalaman(teks: string, target = 2200): string[] {
  const paragraf = teks.split(/\n\s*\n/);
  const halaman: string[] = [];
  let cur = "";
  for (const p of paragraf) {
    const bersih = p.trim();
    if (!bersih) continue;
    if (cur && cur.length + bersih.length > target) {
      halaman.push(cur.trim());
      cur = "";
    }
    cur += bersih + "\n\n";
  }
  if (cur.trim()) halaman.push(cur.trim());
  return halaman;
}
