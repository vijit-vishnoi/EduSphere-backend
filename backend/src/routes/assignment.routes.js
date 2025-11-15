const express = require('express');
const router = express.Router();
const controller = require('../assignment/controller/assignment-controller');
const {protect} = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/authMiddleware');
router.post('/', protect, authorizeRoles('teacher'), controller.createAssignment);
router.get('/:classroomId', protect, controller.getAssignmentsByClassroom);

module.exports = router;
