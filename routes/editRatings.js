const express = require("express");
const app = express.Router();
const db = require("../routes/database");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

app.use(cookieParser());

app.get("/fetchRatings", async (req, res) => {
  const decoded = jwt.decode(req.cookies.auth);
  const email = decoded.email;
  try {
    const result = await db.execute(
      "SELECT AVG(rating) as average_rating FROM ratings WHERE contractor_id = (SELECT id FROM users WHERE email = ?)",
      [email],
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});
module.exports = app;
//text
