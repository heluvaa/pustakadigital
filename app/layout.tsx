import type { Metadata, Viewport } from "next";
import Link from "next/link";
import "./globals.css";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pustakadigital.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: "PustakaDigital — Ebook Gratis & Legal", template: "%s | PustakaDigital" },
  description: "Katalog ebook gratis dan legal: klasik dunia dan buku Indonesia public domain. Baca langsung atau unduh dari sumber resmi.",
  applicationName: "PustakaDigital",
  openGraph: { siteName: "PustakaDigital", locale: "id_ID", type: "website" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f5c5a",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body className="min-h-dvh antialiased">
        <header className="sticky top-0 z-30 border-b border-line bg-paper/90 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <Link href="/" className="focus-ring font-serif text-lg font-semibold tracking-tight text-accent">
              PustakaDigital
            </Link>
            <nav className="text-sm text-muted">
              <Link href="/" className="focus-ring rounded px-2 py-1 hover:text-ink">Katalog</Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 pb-16 pt-6">{children}</main>
        <footer className="border-t border-line">
          <div className="mx-auto max-w-6xl px-4 py-6 text-xs leading-relaxed text-muted">
            Semua buku di katalog berasal dari sumber legal dan public domain (Project Gutenberg, Internet Archive).
            PustakaDigital tidak menyimpan file buku; tombol unduh dan baca mengarah ke sumber resmi.
          </div>
        </footer>
      </body>
    </html>
  );
}
