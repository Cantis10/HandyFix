const express = require("express");
const app = express.Router();
const path = require('path');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/admin/dashboard.html'));
});

app.get('/service', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/admin/serviceRequest.html'));
});

app.get('/contractor', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/admin/contractor.html'));
});

app.get('/customers', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/admin/customers.html'));
});

app.get('/assignment', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/admin/assignment.html'));
});


app.get('/messages', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/admin/messages.html'));
});

app.get('/reports', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/admin/reports.html'));
});

app.get('/settings', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/admin/settings.html'));
});

module.exports = app;