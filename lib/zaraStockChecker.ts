// lib/stock/zaraStockChecker.ts

export type ZaraStockResult = {
  inStock: boolean;
  sizesInStock: string[];
};

function extractProductId(url: string): string | null {
  // Zara ürün linklerinden productId yakalama
  // Örnek: https://www.zara.com/tr/tr/urun-adi-p12345678.html
  const match = url.match(/p(\d+)\.html/);
  return match ? match[1] : null;
}

export async function checkZaraStock(
  productUrl: string
): Promise<ZaraStockResult> {
  const productId = extractProductId(productUrl);

  if (!productId) {
    return {
      inStock: false,
      sizesInStock: [],
    };
  }

  try {
    const apiUrl = `https://www.zara.com/tr/tr/products/${productId}.json`;

    const res = await fetch(apiUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Zara API response error");
    }

    const data = await res.json();

    const sizesInStock: string[] = [];

    const detail = data?.productDetail;
    const colors = detail?.colors ?? [];

    for (const color of colors) {
      const sizes = color?.sizes ?? [];
      for (const size of sizes) {
        if (size?.availability === "in_stock") {
          sizesInStock.push(size.name);
        }
      }
    }

    return {
      inStock: sizesInStock.length > 0,
      sizesInStock,
    };
  } catch (error) {
    console.error("ZARA STOCK ERROR:", error);
    return {
      inStock: false,
      sizesInStock: [],
    };
  }
}
