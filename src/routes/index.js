const express = require('express');
const router = express.Router();
const assignmentRoutes = require('./assignment.routes');
const authRoutes = require('./auth.routes');

router.use('/auth', authRoutes);
router.use('/assignments', assignmentRoutes);
module.exports = router;
