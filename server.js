
const express = require('express');  
const app = express();

const PORT = process.env.PORT || 3000;

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
    data.message = data.message.toUpperCase() + " AND I LOVE VAGINA!!!"; 
  }


  res.json(data);
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});