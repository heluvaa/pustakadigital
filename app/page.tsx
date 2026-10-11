import { BUKU, KATEGORI, bukuTerurut } from "@/lib/books";
import KatalogExplorer from "@/components/KatalogExplorer";

export default function Home() {
  const urut = bukuTerurut();
  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <h1 className="font-serif text-3xl font-semibold leading-tight sm:text-4xl">
          Ebook gratis, legal, dan siap dibaca.
        </h1>
        <p className="max-w-2xl text-muted">
          {BUKU.length} judul dari Project Gutenberg dan Internet Archive. Urut dari yang paling populer.
        </p>
        <p className="flex flex-wrap gap-2 text-sm">
          {KATEGORI.map((k) => (
            <span key={k} className="rounded-full border border-line bg-card px-3 py-1">
              {k} <span className="text-muted">({BUKU.filter((b) => b.kategori === k).length})</span>
            </span>
          ))}
        </p>
      </section>
      <KatalogExplorer buku={urut} />
    </div>
  );
}
