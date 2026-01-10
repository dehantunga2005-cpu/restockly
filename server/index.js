const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

// ortak helper
async function checkLiveStatus(url) {
  try {
    const response = await axios.get(url, {
      validateStatus: () => true,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
        "Accept": "text/html",
      },
    });

    if (response.status === 200) {
      return {
        success: true,
        inStock: true,
        reason: "Ürün yayında",
      };
    }
    if (response.status === 404) {
      return {
        success: true,
        inStock: false,
        reason: "Ürün yayından kalkmış",
      };
    }
    return {
      success: true,
      inStock: false,
      reason: `Beklenmeyen durum (${response.status})`,
    };
  } catch (err) {
    return {
      success: false,
      inStock: false,
      reason: "İstek hatası",
      error: err.message,
    };
  }
}

/**
 * ZARA
 */
app.get("/zara/stock", async (req, res) => {
  const { url } = req.query;
  if (!url || !url.includes("zara.com")) {
    return res.json({ success: false, error: "Geçersiz Zara linki" });
  }
  const result = await checkLiveStatus(url);
  return res.json({ brand: "zara", ...result });
});

/**
 * BERSHKA
 */
app.get("/bershka/stock", async (req, res) => {
  const { url } = req.query;
  if (!url || !url.includes("bershka.com")) {
    return res.json({ success: false, error: "Geçersiz Bershka linki" });
  }
  const result = await checkLiveStatus(url);
  return res.json({ brand: "bershka", ...result });
});

/**
 * PULL&BEAR
 */
app.get("/pullandbear/stock", async (req, res) => {
  const { url } = req.query;
  if (!url || !url.includes("pullandbear.com")) {
    return res.json({ success: false, error: "Geçersiz Pull&Bear linki" });
  }
  const result = await checkLiveStatus(url);
  return res.json({ brand: "pullandbear", ...result });
});

/**
 * STRADIVARIUS
 */
app.get("/stradivarius/stock", async (req, res) => {
  const { url } = req.query;
  if (!url || !url.includes("stradivarius.com")) {
    return res.json({ success: false, error: "Geçersiz Stradivarius linki" });
  }
  const result = await checkLiveStatus(url);
  return res.json({ brand: "stradivarius", ...result });
});

/**
 * OYSHO
 */
app.get("/oysho/stock", async (req, res) => {
  const { url } = req.query;
  if (!url || !url.includes("oysho.com")) {
    return res.json({ success: false, error: "Geçersiz Oysho linki" });
  }
  const result = await checkLiveStatus(url);
  return res.json({ brand: "oysho", ...result });
});

/**
 * server start
 */
app.listen(PORT, () => {
  console.log(`✅ Server running: http://localhost:${PORT}`);
});