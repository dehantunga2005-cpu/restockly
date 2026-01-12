import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

/**
 * Inditex markaları
 */
const BRANDS = {
  zara: {
    name: "Zara",
    api: "https://www.zara.com/tr/tr/products-details",
  },
  bershka: {
    name: "Bershka",
    api: "https://www.bershka.com/tr/products-details",
  },
  pullbear: {
    name: "Pull&Bear",
    api: "https://www.pullandbear.com/tr/products-details",
  },
  stradivarius: {
    name: "Stradivarius",
    api: "https://www.stradivarius.com/tr/products-details",
  },
  oysho: {
    name: "Oysho",
    api: "https://www.oysho.com/tr/products-details",
  },
};

/**
 * Ürün ID çıkar (p03833450 → 03833450)
 */
function extractProductId(url) {
  const match = url.match(/p0*(\d+)/);
  return match ? match[1] : null;
}

/**
 * Gerçek stok sorgusu (Inditex availability)
 */
async function checkStock(brandKey, productId) {
  const brand = BRANDS[brandKey];
  if (!brand) throw new Error("Marka tanımsız");

  const availabilityUrl = `${brand.api}?productIds=${productId}`;

  const res = await fetch(availabilityUrl, {
    headers: {
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
      accept: "application/json",
      "accept-language": "tr-TR,tr;q=0.9",
    },
  });

  if (!res.ok) {
    throw new Error(`${brand.name} API cevap vermedi (${res.status})`);
  }

  const data = await res.json();

  // Genel Inditex response yapısı
  let totalStock = 0;
  let sizes = [];

  for (const prod of data.products || []) {
    for (const size of prod.sizes || []) {
      const qty = size.quantity || 0;
      totalStock += qty;
      sizes.push({
        size: size.name,
        quantity: qty,
        available: qty > 0,
      });
    }
  }

  return {
    brand: brand.name,
    productId,
    totalStock,
    inStock: totalStock > 0,
    sizes,
  };
}

/**
 * Sağlık kontrolü
 */
app.get("/health", (req, res) => {
  res.json({ status: "ok", server: "running" });
});

/**
 * Takip / stok sorgu endpointi
 */
app.post("/track", async (req, res) => {
  const { brand, url } = req.body;

  console.log("📥 Takip isteği geldi");
  console.log("Marka:", brand);
  console.log("URL:", url);

  const productId = extractProductId(url);

  if (!productId) {
    console.log("❌ Product ID bulunamadı");
    return res.status(400).json({ error: "Product ID bulunamadı" });
  }

  console.log("✅ Product ID:", productId);

  try {
    const stock = await checkStock(brand.toLowerCase(), productId);

    console.log("📦 STOK SONUCU:", stock.inStock ? "VAR" : "YOK");
    console.log("Toplam stok:", stock.totalStock);

    res.json(stock);
  } catch (err) {
    console.log("❌ STOK ÇEKME HATASI:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log("✅ REAL STOCK SERVER RUNNING");
  console.log(`🌐 http://localhost:${PORT}`);
});