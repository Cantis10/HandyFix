const express = require("express");
const app = express.Router();
const path = require('path');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/public/welcomeScreen.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/public/login.html'));
});


app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/public/register.html'));
});



module.exports = app;