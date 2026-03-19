const express = require("express");
const app = express.Router();
const path = require('path');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/user/home.html'));
});

app.get('/booking', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/user/booking.html'))
});

app.get('/repairs/:data', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/user/repairList.html'))
});

app.get('/repairs/:data/:subdata', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/user/repairSelection.html'))
});

app.get('/initiateRepair/:data/:subdata', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/user/initiateRepair.html'))
});


module.exports = app;