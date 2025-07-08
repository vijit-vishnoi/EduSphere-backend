const express = require('express');
const router = express.Router();

const { createClassroom, } = require('../classrooms/controller/classroom-controller');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');
const {joinClassroom}=require('../classrooms/controller/classroom-controller');
const {getMyClassrooms}=require('../classrooms/controller/classroom-controller');

router.post('/', protect, authorizeRoles('teacher'), createClassroom);
router.post('/join', protect, authorizeRoles('student'), joinClassroom);
router.get('/my', protect, getMyClassrooms);


module.exports =router 