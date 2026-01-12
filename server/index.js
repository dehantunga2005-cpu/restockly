const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3001;

/* =========================
   MIDDLEWARE
========================= */
app.use(cors());
app.use(express.json());

/* =========================
   HELPERS
========================= */
function extractZaraProductId(url) {
  if (!url) return null;
  const match = url.match(/-p(\d+)\.html/);
  return match ? match[1] : null;
}

function extractProductIdByBrand(brand, url) {
  switch (brand) {
    case "Zara":
      return extractZaraProductId(url);

    case "Bershka":
    case "Pull&Bear":
    case "Stradivarius":
    case "Oysho":
      // ŞİMDİLİK URL KONTROLÜ (gerçek cart API B PLAN 2)
      return "PENDING";

    default:
      return null;
  }
}

/* =========================
   HEALTH CHECK
========================= */
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    server: "running",
    time: new Date().toISOString(),
  });
});

/* =========================
   TRACK ENDPOINT
========================= */
app.post("/track", (req, res) => {
  const { brand, url } = req.body;

  console.log("📩 Takip isteği geldi");
  console.log("Marka:", brand);
  console.log("URL:", url);

  if (!brand || !url) {
    console.log("❌ Eksik veri");
    return res.status(400).json({
      status: "error",
      message: "Brand veya URL eksik",
    });
  }

  const productId = extractProductIdByBrand(brand, url);

  if (!productId) {
    console.log("❌ Product ID çıkarılamadı");
    return res.status(400).json({
      status: "error",
      message: "Product ID bulunamadı",
    });
  }

  console.log("✅ Takip alındı");
  console.log("Product ID:", productId);
  console.log("----------------------");

  return res.json({
    status: "ok",
    message: "Takibe alındı",
    brand,
    productId,
    tracking: true,
  });
});

/* =========================
   SERVER START
========================= */
app.listen(PORT, "0.0.0.0", () => {
  console.log("✅ REAL STOCK SERVER RUNNING");
  console.log(`🌐 http://localhost:${PORT}`);
});