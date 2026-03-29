require('dotenv').config();

const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_for_testing';

// MOCK DATABASE
const mockUsers = [
  { id: 1, email: 'contractor@test.com', password: 'pass', role: 'contractor', name: 'Mike (Contractor)' },
  { id: 2, email: 'customer@test.com', password: 'pass', role: 'customer', name: 'Sarah (Customer)' },
  { id: 3, email: 'hacker@test.com', password: 'pass', role: 'customer', name: 'Eve (Malicious Customer)' }
];

const mockBookings = [
  { id: 'B-101', contractor_id: 1, customer_id: 2, service: 'Plumbing', amount: 1500 },
  { id: 'B-102', contractor_id: 1, customer_id: 2, service: 'Electrical', amount: 3000 },
  { id: 'B-999', contractor_id: 2, customer_id: 3, service: 'Roofing', amount: 8000 }
];

// Middleware A: Verify Identity (Authentication)
const requireAuth = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Unauthorized: No token' });

  jwt.verify(token, JWT_SECRET, (err, decodedUser) => {
    if (err) return res.status(403).json({ error: 'Forbidden: Invalid token' });
    
    req.user = decodedUser; 
    next();
  });
};

//Role 
const requireRole = (allowedRole) => {
  return (req, res, next) => {
    if (req.user.role !== allowedRole) {
      return res.status(403).json({ 
        error: `Access Denied: Requires ${allowedRole} privileges.` 
      });
    }
    next();
  };
};


app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = mockUsers.find(u => u.email === email && u.password === password);

  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign(
    { id: user.id, role: user.role }, 
    JWT_SECRET, 
    { expiresIn: '24h' }
  );
  
  res.json({ token, role: user.role, message: `Welcome ${user.name}` });
});


// Endpoint for Contractors ONLY
app.post(
  '/api/contractor/bookings', 
  requireAuth, 
  requireRole('contractor'), // Only contractors pass this checkpoint
  (req, res) => {
    const myContractorId = req.user.id;
    
    // Anti-IDOR: Filter database strictly by contractor_id
    const myData = mockBookings.filter(b => b.contractor_id === myContractorId);
    
    res.json({ success: true, data: myData });
  }
);

// Endpoint for Customers ONLY
app.post(
  '/api/customer/bookings', 
  requireAuth, 
  requireRole('customer'), // Only customers pass this checkpoint
  (req, res) => {
    const myCustomerId = req.user.id;
    
    // Anti-IDOR: Filter database strictly by customer_id
    const myData = mockBookings.filter(b => b.customer_id === myCustomerId);
    
    res.json({ success: true, data: myData });
  }
);

const PORT = 3000;
app.listen(PORT, () => console.log(`Multi-Role Secure API running on port ${PORT}`));