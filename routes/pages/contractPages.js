const express = require("express");
const app = express.Router();
const path = require('path');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/contractor/home.html'));
});

app.get('/job', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/contractor/job.html'));
});

app.get('/profile', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/contractor/profile.html'));
});


module.exports = app;