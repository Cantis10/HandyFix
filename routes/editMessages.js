const express = require("express");
const app = express.Router();
const db = require("./database");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

app.use(cookieParser());

app.get("/fetchMessages", async (req, res) => {
  try {
    const decoded = jwt.decode(req.cookies.auth);
    const email = decoded.email;

    console.log("Fetching messages for email:", email);
    

    const result = await db.execute(`
SELECT m.*
FROM messages m
INNER JOIN tickets t
    ON m.ticket_id = t.id
INNER JOIN users u
    ON t.user_id = u.id
WHERE u.email = ?;
       `, [email]);

       console.log("Messages fetched:", result.rows);

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = app;
//text