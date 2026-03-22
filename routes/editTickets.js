const express = require("express");
const app = express.Router();
const db = require("./database");

/**
CREATE TABLE tickets (
id INTEGER PRIMARY KEY AUTOINCREMENT,
user_id INT,
order_date DATE,
type VARCHAR(100),
sub_type VARCHAR(100),
description TEXT,
state VARCHAR(100) DEFAULT 'open', --open, closed, cancelled
FOREIGN KEY (user_id) REFERENCES users(id)
);

 */

app.get("/AllTickets", async (req, res) => {
  try {
    const result = await db.execute("SELECT * FROM tickets");

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/fetchTicket/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const userId = req.params.id;
    const result = await db.execute("SELECT * FROM tickets WHERE id = ?", [
      userId,
    ]);

    if (!result.rows || result.rows.length === 0) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.put("/EditTickets/:id", async (req, res) => {
  try {
    const ticketId = req.params.id;
    const { user_id, order_date, type, sub_type, description, state } =
      req.body;

    const existing = await db.execute("SELECT * FROM tickets WHERE id = ?", [
      ticketId,
    ]);
    if (!existing.rows || existing.rows.length === 0) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    await db.execute(
      "UPDATE tickets SET user_id = ?, order_date = ?, type = ?, sub_type = ?, description = ?, state = ? WHERE id = ?",
      [
        user_id || existing.rows[0].user_id,
        order_date || existing.rows[0].order_date,
        type || existing.rows[0].type,
        sub_type || existing.rows[0].sub_type,
        description || existing.rows[0].description,
        state || existing.rows[0].state,
        ticketId,
      ],
    );

    const updated = await db.execute("SELECT * FROM tickets WHERE id = ?", [
      ticketId,
    ]);
    res.json(updated.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/CountTickets", async (req, res) => {
  try {
    const total = await db.execute("SELECT COUNT(*) as count FROM tickets");
    const totalAssigned = await db.execute(
      "SELECT COUNT(*) as count FROM tickets WHERE state = 'assigned'",
    );
    const totalClosed = await db.execute(
      "SELECT COUNT(*) as count FROM tickets WHERE state = 'closed'",
    );

    res.json({
      total: total.rows[0].count,
      totalAssigned: totalAssigned.rows[0].count,
      totalClosed: totalClosed.rows[0].count,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/AddTicket", async (req, res) => {
  try {
    const { user_id, order_date, type, sub_type, description, state } =
      req.body;

    // Insert new user (ID will be auto-incremented)
    await db.execute(
      `INSERT INTO tickets (user_id, order_date, type, sub_type, description, state) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [user_id, order_date, type, sub_type, description, state],
    );

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = app;
