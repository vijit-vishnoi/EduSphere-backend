const express = require('express');
const router = express.Router();

const userController = require('../auth/controllers/user-controllers');

// Register student or teacher based on role in body
router.post('/register', userController.register);

// Common login
router.post('/login', userController.login);

module.exports = router;
