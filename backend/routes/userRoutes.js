// routes/userRoutes.js
const express = require('express');
const authenticateToken = require('../middleware/jwtAuth');
const { getProfile, updateProfile } = require('../controllers/userController');
const router = express.Router();

router.get('/profile', authenticateToken, getProfile);
router.put('/profile', authenticateToken, updateProfile);

// NEW – used by AuthContext on page load
router.get('/me', authenticateToken, getProfile);   // ← add this

module.exports = router;