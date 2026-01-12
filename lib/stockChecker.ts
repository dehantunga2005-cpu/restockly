// lib/stockChecker.ts

export type StockResult = {
  brand: string;
  inStock: boolean;
  checkedAt: number;
};

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36";

// BRAND TESPİTİ
export function detectBrand(url: string): string {
  const u = url.toLowerCase();
  if (u.includes("zara.com")) return "Zara";
  if (u.includes("bershka.com")) return "Bershka";
  if (u.includes("pullandbear.com")) return "Pull&Bear";
  if (u.includes("stradivarius.com")) return "Stradivarius";
  if (u.includes("oysho.com")) return "Oysho";
  return "Bilinmeyen";
}

// ANA STOK KONTROL FONKSİYONU
export async function checkStock(url: string): Promise<StockResult> {
  const brand = detectBrand(url);

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "User-Agent": USER_AGENT,
        Accept: "text/html",
      },
    });

    const html = await response.text();

    let inStock = false;

    switch (brand) {
      case "Zara":
        inStock =
          !html.toLowerCase().includes("tükendi") &&
          !html.toLowerCase().includes("out of stock");
        break;

      case "Bershka":
        inStock =
          !html.toLowerCase().includes("stokta yok") &&
          !html.toLowerCase().includes("out of stock");
        break;

      case "Pull&Bear":
      case "Stradivarius":
      case "Oysho":
        inStock = !html.toLowerCase().includes("out of stock");
        break;

      default:
        inStock = false;
    }

    return {
      brand,
      inStock,
      checkedAt: Date.now(),
    };
  } catch (error) {
    return {
      brand,
      inStock: false,
      checkedAt: Date.now(),
    };
  }
}
