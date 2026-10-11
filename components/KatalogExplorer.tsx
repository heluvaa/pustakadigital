"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { Buku, Bahasa, Kategori } from "@/lib/books";
import { KATEGORI } from "@/lib/books";
import { sampulUrl } from "@/lib/sampul";

type Lanjut = Record<string, { halaman: number; waktu: number }>;

export default function KatalogExplorer({ buku }: { buku: Buku[] }) {
  const [q, setQ] = useState("");
  const [kat, setKat] = useState<Kategori | "Semua">("Semua");
  const [bhs, setBhs] = useState<Bahasa | "Semua">("Semua");
  const [lanjut, setLanjut] = useState<Lanjut>({});

  // Baca posisi terakhir dari localStorage setelah mount (hindari mismatch SSR).
  useEffect(() => {
    try {
      setLanjut(JSON.parse(localStorage.getItem("pd:lanjut") ?? "{}"));
    } catch {
      setLanjut({});
    }
  }, []);

  const hasil = useMemo(() => {
    const kueri = q.trim().toLowerCase();
    return buku.filter((b) => {
      if (kat !== "Semua" && b.kategori !== kat) return false;
      if (bhs !== "Semua" && b.bahasa !== bhs) return false;
      if (!kueri) return true;
      return `${b.judul} ${b.penulis}`.toLowerCase().includes(kueri);
    });
  }, [buku, q, kat, bhs]);

  const lanjutList = buku
    .filter((b) => lanjut[b.slug])
    .sort((a, b) => (lanjut[b.slug].waktu - lanjut[a.slug].waktu));

  return (
    <div className="space-y-8">
      {lanjutList.length > 0 && (
        <section aria-labelledby="lanjut-heading" className="space-y-3">
          <h2 id="lanjut-heading" className="text-sm font-semibold uppercase tracking-wide text-muted">Lanjutkan baca</h2>
          <ul className="flex gap-3 overflow-x-auto pb-2">
            {lanjutList.slice(0, 6).map((b) => (
              <li key={b.slug} className="min-w-[220px] rounded-md border border-line bg-card p-3">
                <Link href={`/baca/${b.slug}`} className="focus-ring block">
                  <p className="line-clamp-1 text-sm font-medium">{b.judul}</p>
                  <p className="text-xs text-muted">Halaman {lanjut[b.slug].halaman + 1}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section aria-label="Pencarian dan filter" className="space-y-3">
        <label className="block">
          <span className="sr-only">Cari judul atau penulis</span>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Cari judul atau penulis…"
            className="focus-ring w-full rounded-md border border-line bg-card px-4 py-3 text-base"
          />
        </label>
        <div className="flex flex-wrap gap-2 text-sm" role="group" aria-label="Filter kategori">
          {(["Semua", ...KATEGORI] as const).map((k) => (
            <button key={k} onClick={() => setKat(k)} aria-pressed={kat === k}
              className={`focus-ring rounded-full border px-3 py-1 ${kat === k ? "border-accent bg-accent text-white" : "border-line bg-card"}`}>
              {k}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 text-sm" role="group" aria-label="Filter bahasa">
          {([["Semua", "Semua bahasa"], ["id", "Indonesia"], ["en", "English"]] as const).map(([v, label]) => (
            <button key={v} onClick={() => setBhs(v)} aria-pressed={bhs === v}
              className={`focus-ring rounded-full border px-3 py-1 ${bhs === v ? "border-accent bg-accent text-white" : "border-line bg-card"}`}>
              {label}
            </button>
          ))}
        </div>
        <p className="text-sm text-muted" aria-live="polite">{hasil.length} judul</p>
      </section>

      {hasil.length === 0 ? (
        <p className="py-10 text-center text-muted">Tidak ada judul yang cocok.</p>
      ) : (
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {hasil.map((b) => <KartuBuku key={b.slug} buku={b} />)}
        </ul>
      )}
    </div>
  );
}

function KartuBuku({ buku }: { buku: Buku }) {
  return (
    <li>
      <Link href={`/buku/${buku.slug}`} className="focus-ring group block">
        <div className="cover-shadow aspect-[2/3] overflow-hidden rounded-md bg-accent-soft">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={sampulUrl(buku)} alt={`Sampul ${buku.judul}`} loading="lazy"
            className="h-full w-full object-cover transition group-hover:scale-[1.02]" />
        </div>
        <h3 className="mt-2 line-clamp-2 text-sm font-medium leading-snug">{buku.judul}</h3>
        <p className="line-clamp-1 text-xs text-muted">{buku.penulis}</p>
        <p className="mt-1 text-[11px] uppercase tracking-wide text-accent">
          {buku.bahasa === "id" ? "Indonesia" : "English"} · {buku.kategori}
        </p>
      </Link>
    </li>
  );
}
