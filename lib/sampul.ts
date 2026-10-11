// Sampul dari Open Library Cover API (gratis).
// Buku IA memakai identifier IA; buku Gutenberg tidak punya sampul IA, jadi pakai placeholder CSS.
import type { Buku } from "./books";

export function sampulUrl(b: Buku): string {
  if (b.sampul?.tipe === "ia") {
    return `https://archive.org/services/img/${encodeURIComponent(b.sampul.id)}`;
  }
  return `/sampul-placeholder.svg`;
}
