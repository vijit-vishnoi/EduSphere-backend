const express = require('express');
const router = express.Router();
const { protect, authorizeRoles } = require('../middleware/authMiddleware');
const userController = require('../auth/controllers/user-controllers');

router.get('/profile', protect, (req, res) => {
  res.json({ message: 'Welcome, user', user: req.user });
});

router.get('/teacher-only', protect, authorizeRoles('teacher'), (req, res) => {
  res.json({ message: 'Hello Teacher!' });
});

router.post('/register', userController.register);

router.post('/login', userController.login);

module.exports = router;
