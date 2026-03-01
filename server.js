const express = require('express');
const app = express();
require('dotenv').config();
const { createClient } = require('@libsql/client');

const PORT = process.env.PORT || 3000;


function getDbClient() {
  if (!process.env.TURSO_LINK || !process.env.TURSO_TOKEN) {
    throw new Error('Database not configured');
  }

  return createClient({
    url: process.env.TURSO_LINK,
    authToken: process.env.TURSO_TOKEN,
  });
}


app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Hello, JSON world!' });
});

app.get('/users', (req, res) => {
  res.json({ users: ['Alice', 'Bob', 'Charlie'] });
});

app.get('/test', (req, res) => {
  res.json({ messages: "Vercel says: Hello! I am running off this mfin server!" });
})

app.post('/post', (req, res) => {
  const data = req.body;

    if (data.message) {
    data.message = data.message.toUpperCase() + " AND I LOVE YOU!!!";
  }


  res.json(data);
})

app.get('/test-db', async (req, res) => {
  const db =
  getDbClient(); 
  try {
    const result = await db.execute('SELECT 1 as result');
    res.json({ success: true, message: 'Connected to Turso DB!', data: result.rows });
  } catch (err) {
    console.error('❌ Connection failed:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/login', async (req, res) => {

  const db = getDbClient();
  try {
    const { email, password } = req.body;

    const result = await db.execute({
      sql: "SELECT id, email, password FROM users WHERE email = ?",
      args: [email],
    });

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "User not found" });
    }

    const user = result.rows[0];

    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid password" });
    }

    res.json({ success: true, user: { id: user.id, email: user.email } });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.post('/api/register', async (req, res) => {

  let x = 0;

  console.log("test " + x++);
  const db = getDbClient();
  /*
  CREATE TABLE users (
id INTEGER PRIMARY KEY AUTOINCREMENT,
first_name VARCHAR(100) NOT NULL,
last_name VARCHAR(100) NOT NULL,
age INT,
email VARCHAR(255) UNIQUE,
password VARCHAR(255) NOT NULL,
creation_date DATE,
contact_number VARCHAR(20),
address VARCHAR(255),
latitude DECIMAL(9,6),
longitude DECIMAL(9,6),
type VARCHAR(100) NOT NULL DEFAULT 'user' --user, contractor, admin
);

  */
 console.log("test " + x++);

  try {
    const { first_name, last_name, age, email, password, contact_number, address } = req.body;

    console.log("test " + x++);

    if(!first_name || !last_name || !email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    console.log("test " + x++);

    if(age && (isNaN(age) || age < 0)) {
      return res.status(400).json({ error: "Invalid age" });
    }

    console.log("test " + x++);

    if(contact_number && !/^\+?[0-9]{7,15}$/.test(contact_number)) {
      return res.status(400).json({ error: "Invalid contact number" });
    }

    console.log("test " + x++);

    if(address && address.length > 255) {
      return res.status(400).json({ error: "Address too long" });
    }

    console.log("test " + x++);

    if(email.length > 255) {
      return res.status(400).json({ error: "Email too long" });
    }

    console.log("test " + x++);

    if(password.length > 255) {
      return res.status(400).json({ error: "Password too long" });
    }

    console.log("test " + x++);

    if(first_name.length > 100 || last_name.length > 100) {
      return res.status(400).json({ error: "Name too long" });
    }

    console.log("test " + x++);

    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    console.log("test " + x++);

    if(password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters" });
    }

    console.log("test " + x++);

    if(first_name.length < 2 || last_name.length < 2) {
      return res.status(400).json({ error: "Name must be at least 2 characters" });
    }

    console.log("test " + x++);
    

    const result = await db.execute({
      sql: "INSERT INTO users (first_name, last_name, age, email, password, creation_date, contact_number, address) VALUES (?, ?, ?, ?, ?, date('now'), ?, ?)",
      args: [first_name, last_name, age, email, password, contact_number, address],
    });

    console.log("test " + x++);

    res.json({ success: true, userId: result.lastInsertRowid });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});
    
    


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
