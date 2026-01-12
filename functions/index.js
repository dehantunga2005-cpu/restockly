const functions = require("firebase-functions/v2/https");
const fetch = require("node-fetch");

exports.checkZaraStock = functions.onRequest(
  { region: "us-central1" },
  async (req, res) => {
    try {
      const productUrl = req.query.url;
      if (!productUrl) {
        return res.status(400).json({
          success: false,
          error: "url parametresi eksik",
        });
      }

      // 1️⃣ Ürün sayfasını çek
      const pageRes = await fetch(productUrl, {
        headers: {
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
      });

      const html = await pageRes.text();

      // 2️⃣ Product ID yakala
      const productIdMatch = html.match(/"productId":\s*(\d+)/);
      if (!productIdMatch) {
        return res.json({
          success: true,
          inStock: false,
          reason: "Product ID bulunamadı",
        });
      }

      const productId = productIdMatch[1];

      // 3️⃣ Zara stok API
      const stockApiUrl = `https://www.zara.com/tr/tr/products/${productId}/availability`;

      const stockRes = await fetch(stockApiUrl, {
        headers: {
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          accept: "application/json",
        },
      });

      const stockJson = await stockRes.json();

      // 4️⃣ Stok kontrol
      let inStock = false;

      if (
        stockJson?.availability &&
        Array.isArray(stockJson.availability)
      ) {
        for (const size of stockJson.availability) {
          if (size.quantity > 0) {
            inStock = true;
            break;
          }
        }
      }

      return res.json({
        success: true,
        inStock,
        checkedAt: new Date().toISOString(),
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: err.message,
      });
    }
  }
);
