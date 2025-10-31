const express = require('express');
const { register, login } = require('../controllers/authController');
const { registerValidation, loginValidation } = require('../validations/authValidations');
const authenticateToken = require('../middleware/jwtAuth');
const User = require('../models/User');
const router = express.Router();

router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);


router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
