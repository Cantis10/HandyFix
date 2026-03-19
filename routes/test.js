const express = require("express");
const app = express.Router();
const db = require("../routes/database");

app.get("/test/test", (req, res) => {
  res.json({
    messages: "HOST says: Hello! I am running off this mfin server!",
  });
});

app.post("/test/post", (req, res) => {
  const data = req.body;

  if (data.message) {
    data.message = data.message.toUpperCase() + " AND I LOVE YOU!!!";
  }

  res.json(data);
});

app.get("/test-db", async (req, res) => {

  try {
    const result = await db.execute("SELECT 1 as result");
    res.json({
      success: true,
      message: "Connected to Turso DB!",
      data: result.rows,
    });
  } catch (err) {
    console.error("❌ Connection failed:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});




module.exports = app;