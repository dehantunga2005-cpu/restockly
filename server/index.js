import express from "express";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("RESTOCKLY REAL STOCK SERVER RUNNING");
});

/**
 * ZARA GERÇEK STOK (CART API)
 */
async function checkZaraStock(productId) {
  const url = `https://www.zara.com/tr/tr/products-details/${productId}.json`;

  const res = await fetch(url, {
    headers: {
      "user-agent": "Mozilla/5.0",
      "accept": "application/json"
    }
  });

  if (!res.ok) throw new Error("Zara API hata");

  const data = await res.json();

  let totalStock = 0;

  data?.colors?.forEach(color => {
    color?.sizes?.forEach(size => {
      if (size.availability === "in_stock") {
        totalStock += size.quantity || 1;
      }
    });
  });

  return totalStock;
}

app.post("/track", async (req, res) => {
  try {
    const { brand, productId } = req.body;

    console.log("Takip isteği geldi:", brand, productId);

    let stock = 0;

    if (brand === "zara") {
      stock = await checkZaraStock(productId);
    } else {
      return res.status(400).json({ error: "Marka desteklenmiyor (şimdilik)" });
    }

    res.json({
      brand,
      productId,
      stock,
      status: stock > 0 ? "STOK VAR" : "STOK YOK"
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Stok çekilemedi" });
  }
});

app.listen(3001, () => {
  console.log("REAL STOCK SERVER RUNNING → http://localhost:3001");
});