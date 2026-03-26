const express = require("express");
const app = express.Router();
const path = require('path');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/contractor/contractor_dashboard.html'));
});

app.get('/calendar', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/contractor/contractor_endar.html'));
});

app.get('/bookings', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/contractor/contractor_bookings.html'));
});

app.get('/messages', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/contractor/contractor_messages.html'));
});

app.get('/profile', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/contractor/contractor_profile.html'));
});

app.get('/settings', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/contractor/contractor_settings.html'));
});


module.exports = app;