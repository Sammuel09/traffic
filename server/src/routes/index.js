const express = require('express');
const router = express.Router();

const countRoutes = require('./countRouter');

// Mount routes
router.use('/count', countRoutes);

// Health check route
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
