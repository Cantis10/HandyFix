const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World from Express!');
});

app.get('/api/test', (req, res) => {
  const data = { message: "Hello, this is JSON!" };
  res.json(data); 
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
