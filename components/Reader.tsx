"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { Buku } from "@/lib/books";

type Tema = "terang" | "malam";
type Pref = { font: number; tema: Tema; halaman: number; bookmark: number[] };

const KUNCI = (slug: string) => `pd:${slug}`;
const PREF_DEFAULT: Pref = { font: 18, tema: "terang", halaman: 0, bookmark: [] };

function muat(slug: string): Pref {
  try {
    const raw = localStorage.getItem(KUNCI(slug));
    return raw ? { ...PREF_DEFAULT, ...JSON.parse(raw) } : PREF_DEFAULT;
  } catch {
    return PREF_DEFAULT;
  }
}

function simpan(slug: string, p: Pref) {
  try {
    localStorage.setItem(KUNCI(slug), JSON.stringify(p));
    // Riwayat "lanjutkan baca" disimpan terpisah agar katalog bisa membacanya tanpa parsing semua buku.
    const lanjut = JSON.parse(localStorage.getItem("pd:lanjut") ?? "{}");
    lanjut[slug] = { halaman: p.halaman, waktu: Date.now() };
    localStorage.setItem("pd:lanjut", JSON.stringify(lanjut));
  } catch {
    /* storage penuh atau diblokir: baca tetap jalan tanpa simpan */
  }
}

export default function Reader({ buku }: { buku: Buku }) {
  const [halaman, setHalaman] = useState<string[] | null>(null);
  const [galat, setGalat] = useState<string | null>(null);
  const [pref, setPref] = useState<Pref>(PREF_DEFAULT);
  const [siap, setSiap] = useState(false);

  useEffect(() => {
    const p = muat(buku.slug);
    setPref(p);
    setSiap(true);
  }, [buku.slug]);

  useEffect(() => {
    let batal = false;
    fetch(`/api/teks/${buku.slug}`)
      .then(async (r) => {
        const j = await r.json();
        if (!r.ok) throw new Error(j.error ?? "Gagal memuat teks");
        return j.halaman as string[];
      })
      .then((h) => { if (!batal) setHalaman(h); })
      .catch((e) => { if (!batal) setGalat(e.message); });
    return () => { batal = true; };
  }, [buku.slug]);

  useEffect(() => {
    if (siap) simpan(buku.slug, pref);
  }, [pref, siap, buku.slug]);

  const total = halaman?.length ?? 0;
  const idx = Math.min(pref.halaman, Math.max(0, total - 1));
  const adaBookmark = pref.bookmark.includes(idx);

  const ubah = (patch: Partial<Pref>) => setPref((p) => ({ ...p, ...patch }));
  const pindah = (n: number) => {
    const next = Math.min(Math.max(0, n), total - 1);
    ubah({ halaman: next });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const toggleBookmark = () =>
    ubah({ bookmark: adaBookmark ? pref.bookmark.filter((x) => x !== idx) : [...pref.bookmark, idx].sort((a, b) => a - b) });

  const teks = useMemo(() => (halaman ? halaman[idx] : ""), [halaman, idx]);

  return (
    <div className={`reader-surface rounded-lg ${pref.tema === "malam" ? "dark" : "bg-card"} p-4 sm:p-8`}>
      <div className="mb-6 flex flex-wrap items-center gap-2 border-b border-line pb-4 text-sm">
        <Link href={`/buku/${buku.slug}`} className="focus-ring rounded px-2 py-1 text-accent">← Detail</Link>
        <span className="ml-auto flex items-center gap-1" role="group" aria-label="Ukuran font">
          <button className="focus-ring rounded border border-line px-3 py-1" onClick={() => ubah({ font: Math.max(14, pref.font - 2) })} aria-label="Perkecil font">A−</button>
          <span className="w-10 text-center tabular-nums">{pref.font}</span>
          <button className="focus-ring rounded border border-line px-3 py-1" onClick={() => ubah({ font: Math.min(28, pref.font + 2) })} aria-label="Perbesar font">A+</button>
        </span>
        <button className="focus-ring rounded border border-line px-3 py-1" onClick={() => ubah({ tema: pref.tema === "malam" ? "terang" : "malam" })}>
          {pref.tema === "malam" ? "Terang" : "Malam"}
        </button>
        <button className="focus-ring rounded border border-line px-3 py-1" aria-pressed={adaBookmark} onClick={toggleBookmark}>
          {adaBookmark ? "★ Bookmark" : "☆ Bookmark"}
        </button>
      </div>

      {galat && <p role="alert" className="text-sm text-red-700">{galat}. Coba lagi nanti, atau buka <a className="underline" href={buku.linkSumber}>sumber resmi</a>.</p>}
      {!galat && !halaman && <p className="text-muted">Memuat teks dari sumber legal…</p>}

      {halaman && (
        <>
          <article className="reader-text max-w-[68ch] mx-auto" style={{ fontSize: pref.font }}>{teks}</article>
          <nav className="mt-10 flex items-center justify-between gap-3 border-t border-line pt-4 text-sm" aria-label="Navigasi halaman">
            <button className="focus-ring rounded border border-line px-4 py-2 disabled:opacity-40" disabled={idx === 0} onClick={() => pindah(idx - 1)}>← Sebelumnya</button>
            <span className="tabular-nums text-muted">{idx + 1} / {total}</span>
            <button className="focus-ring rounded border border-line px-4 py-2 disabled:opacity-40" disabled={idx >= total - 1} onClick={() => pindah(idx + 1)}>Berikutnya →</button>
          </nav>
          {pref.bookmark.length > 0 && (
            <p className="mt-4 text-xs text-muted">
              Bookmark: {pref.bookmark.map((n) => (
                <button key={n} className="focus-ring mr-2 underline" onClick={() => pindah(n)}>hal. {n + 1}</button>
              ))}
            </p>
          )}
        </>
      )}
    </div>
  );
}
