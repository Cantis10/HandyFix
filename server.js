const express = require('express');
const app = express();

app.use(express.json());


app.get('/', (req, res) => {
  res.json({ message: "Hello JSON from Express + Vercel!" });
});


app.get('/api/test', (req, res) => {
  res.json({ message: "Hello /test JSON!" });
});

app.listen(3000, () => {
  console.log("App on port " + process.env.PORT);
});