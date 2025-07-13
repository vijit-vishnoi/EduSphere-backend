const express = require('express');
const router = express.Router();
const assignmentRoutes = require('./assignment.routes');
const authRoutes = require('./auth.routes');
const submissionRoutes = require('../routes/submission.routes');
const classroomRoutes = require('./classroom.routes');
router.use('/auth', authRoutes);
router.use('/assignments', assignmentRoutes);
router.use('/submissions', submissionRoutes);
router.use('/classrooms', classroomRoutes);

module.exports = router;
