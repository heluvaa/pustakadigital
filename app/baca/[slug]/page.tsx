import { notFound } from "next/navigation";
import { BUKU, bukuBySlug } from "@/lib/books";
import { urlTeks } from "@/lib/teks";
import Reader from "@/components/Reader";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return BUKU.filter((b) => urlTeks(b) !== null).map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const b = bukuBySlug(slug);
  if (!b) return { title: "Tidak ditemukan" };
  return {
    title: `Baca ${b.judul}`,
    description: `Baca ${b.judul} karya ${b.penulis} gratis dan legal di PustakaDigital.`,
    robots: { index: false, follow: true },
  };
}

export default async function Baca({ params }: Props) {
  const { slug } = await params;
  const b = bukuBySlug(slug);
  if (!b || urlTeks(b) === null) notFound();
  return (
    <div className="space-y-4">
      <h1 className="font-serif text-xl font-semibold">{b.judul}</h1>
      <Reader buku={b} />
    </div>
  );
}
