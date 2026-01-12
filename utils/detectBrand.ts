export type Brand =
  | "ZARA"
  | "BERSHKA"
  | "PULL&BEAR"
  | "STRADIVARIUS"
  | "OYSHO";

export function detectBrand(link: string): Brand | null {
  const url = link.toLowerCase();

  if (url.includes("zara.com")) return "ZARA";
  if (url.includes("bershka.com")) return "BERSHKA";
  if (url.includes("pullandbear.com")) return "PULL&BEAR";
  if (url.includes("stradivarius.com")) return "STRADIVARIUS";
  if (url.includes("oysho.com")) return "OYSHO";

  return null; // ⚠️ ASLA default ZARA yok
}




