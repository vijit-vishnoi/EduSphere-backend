const express = require('express');
const router = express.Router();
const controller = require('../submission/controller/submission-controller');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');
const { getMySubmission,gradeSubmission } = require('../submission/controller/submission-controller');


router.post('/', protect, authorizeRoles('student'), controller.createSubmission);
router.get('/:assignmentId', protect, authorizeRoles('student'), getMySubmission);
router.get('/:assignmentId/all', protect, controller.getAllSubmissionsForAssignment); 
router.post('/:submissionId/grade', protect, authorizeRoles('teacher'),gradeSubmission);


module.exports = router;
