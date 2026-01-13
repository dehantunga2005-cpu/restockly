const express = require("express");
const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  console.log("🟢 /health isteği geldi");
  res.send("Backend ayakta");
});

app.post("/track", (req, res) => {
  console.log("📦 TAKİP İSTEĞİ:", req.body);
  res.json({ ok: true });
});

app.listen(3001, "0.0.0.0", () => {
  console.log("✅ BACKEND ÇALIŞIYOR → http://192.168.1.104:3001");
});