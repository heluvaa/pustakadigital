import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BUKU, bukuBySlug } from "@/lib/books";
import { sampulUrl } from "@/lib/sampul";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return BUKU.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const b = bukuBySlug(slug);
  if (!b) return { title: "Tidak ditemukan" };
  const judul = `Baca ${b.judul} gratis di PustakaDigital`;
  const deskripsi = `Baca ${b.judul} karya ${b.penulis} (${b.tahun}) gratis dan legal. ${b.deskripsi}`;
  return {
    title: judul,
    description: deskripsi,
    alternates: { canonical: `/buku/${b.slug}` },
    openGraph: { title: judul, description: deskripsi, type: "book", url: `/buku/${b.slug}` },
  };
}

export default async function DetailBuku({ params }: Props) {
  const { slug } = await params;
  const b = bukuBySlug(slug);
  if (!b) notFound();

  const adaBaca = b.sumber === "gutenberg" || b.sumberId in {
    MADILOG: 1, "gerpolek-tan-malaka": 1, "semangat-muda-tan-malaka": 1,
    "parlemen-atau-soviet-tan-malaka": 1, "rencana-ekonomi-berjuang-tan-malaka": 1,
  };

  return (
    <article className="grid gap-8 md:grid-cols-[260px_1fr]">
      <div className="mx-auto w-full max-w-[240px] md:mx-0">
        <div className="cover-shadow aspect-[2/3] overflow-hidden rounded-md bg-accent-soft">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={sampulUrl(b)} alt={`Sampul ${b.judul}`} className="h-full w-full object-cover" />
        </div>
      </div>

      <div className="space-y-5">
        <header className="space-y-2">
          <p className="text-xs uppercase tracking-wide text-accent">
            {b.kategori} · {b.bahasa === "id" ? "Indonesia" : "English"}
          </p>
          <h1 className="font-serif text-3xl font-semibold leading-tight">{b.judul}</h1>
          <p className="text-muted">
            {b.penulis} · {b.tahun < 0 ? `${Math.abs(b.tahun)} SM` : b.tahun}
          </p>
        </header>

        <p className="leading-relaxed">{b.deskripsi}</p>

        <dl className="grid grid-cols-2 gap-3 text-sm sm:max-w-md">
          <div className="rounded-md border border-line bg-card p-3">
            <dt className="text-muted">Sumber</dt>
            <dd className="font-medium">{b.sumber === "gutenberg" ? "Project Gutenberg" : "Internet Archive"}</dd>
          </div>
          <div className="rounded-md border border-line bg-card p-3">
            <dt className="text-muted">Popularitas</dt>
            <dd className="font-medium">{b.popularitas.toLocaleString("id-ID")} unduhan</dd>
          </div>
        </dl>

        <div className="flex flex-wrap gap-3">
          {adaBaca && (
            <Link href={`/baca/${b.slug}`} className="focus-ring rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
              Baca di sini
            </Link>
          )}
          {b.linkEpub && (
            <a href={b.linkEpub} rel="noopener noreferrer" className="focus-ring rounded-md border border-line bg-card px-5 py-2.5 text-sm font-medium hover:bg-paper">
              Unduh EPUB
            </a>
          )}
          {b.linkPdf && (
            <a href={b.linkPdf} rel="noopener noreferrer" className="focus-ring rounded-md border border-line bg-card px-5 py-2.5 text-sm font-medium hover:bg-paper">
              Unduh PDF
            </a>
          )}
          <a href={b.linkSumber} rel="noopener noreferrer" className="focus-ring self-center text-sm text-accent underline underline-offset-4">
            Lihat di sumber resmi
          </a>
        </div>
      </div>
    </article>
  );
}
