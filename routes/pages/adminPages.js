const express = require("express");
const app = express.Router();
const path = require('path');
const { requireAuth } = require("../token"); 
app.get('/', requireAuth('admin'), (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/admin/Admin_Dashboard.html'));
});

app.get('/service', requireAuth('admin'), (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/admin/Service_Requests.html'));
});

app.get('/contractor', requireAuth('admin'), (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/admin/Contractor.html'));
});

app.get('/categories', requireAuth('admin'), (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/admin/Edit_Categories.html'));
});

app.get('/customers', requireAuth('admin'), (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/admin/Customers.html'));
});

app.get('/assignment', requireAuth('admin'), (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/admin/Assignment.html'));
});


app.get('/messages', requireAuth('admin'), (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/admin/Messages.html'));
});

app.get('/reports', requireAuth('admin'), (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/admin/Reports.html'));
});

app.get('/settings', requireAuth('admin'), (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/admin/Settings.html'));
});

module.exports = app;