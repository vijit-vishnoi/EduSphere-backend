// routes/commentRoutes.js
const express = require('express');
const router = express.Router();
const commentController = require('../comments/controllers/comment-controllers');
const {protect} = require('../middleware/authMiddleware'); // assuming auth middleware is here

// POST /api/comments → Add a new comment

router.post('/', protect, commentController.createComment);

// GET /api/comments/:assignmentId → Get all comments under an assignment
router.get('/:assignmentId', protect, commentController.getCommentsByAssignment);

module.exports = router;
