export type Brand =
  | "ZARA"
  | "BERSHKA"
  | "PULL&BEAR"
  | "STRADIVARIUS"
  | "OYSHO"
  | null;

export default function detectBrand(url: string): Brand {
  const u = url.toLowerCase();

  if (u.includes("zara")) return "ZARA";
  if (u.includes("bershka")) return "BERSHKA";
  if (u.includes("pullandbear") || u.includes("pull&bear")) return "PULL&BEAR";
  if (u.includes("stradivarius")) return "STRADIVARIUS";
  if (u.includes("oysho")) return "OYSHO";

  return null;
}


