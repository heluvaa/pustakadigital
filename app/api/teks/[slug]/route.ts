import { NextResponse } from "next/server";
import { bukuBySlug } from "@/lib/books";
import { bersihkanTeks, pecahHalaman, urlTeks } from "@/lib/teks";

// Teks diambil dari sumber legal saat dibutuhkan, lalu di-cache server 24 jam.
// Tidak ada file buku yang disimpan di repo.
export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const buku = bukuBySlug(slug);
  if (!buku) return NextResponse.json({ error: "Buku tidak ditemukan" }, { status: 404 });

  const url = urlTeks(buku);
  if (!url) return NextResponse.json({ error: "Teks belum tersedia untuk buku ini" }, { status: 404 });

  try {
    const res = await fetch(url, { next: { revalidate: 86400 }, headers: { "User-Agent": "PustakaDigital/0.1" } });
    if (!res.ok) throw new Error(`upstream ${res.status}`);
    const raw = await res.text();
    const halaman = pecahHalaman(bersihkanTeks(raw));
    return NextResponse.json({ judul: buku.judul, halaman }, {
      headers: { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800" },
    });
  } catch {
    return NextResponse.json({ error: "Sumber sedang tidak bisa diakses. Coba lagi nanti." }, { status: 502 });
  }
}
