const ClassroomService = require('../services/classroom-service');
const classroomService = new ClassroomService(); 
const { User,Classroom } = require('../../models');

const createClassroom = async (req, res) => {
  try {
    const { name, subject } = req.body;
    const teacherId = req.user.id;

    const classroom = await classroomService.createClassroom({
      name,
      subject,
      teacherId,
    });

    res.status(201).json({ message: 'Classroom created', classroom });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const joinClassroom = async (req, res) => {
  try {
    const { code } = req.body;
    const studentId = req.user.id;

    const classroom = await classroomService.joinClassroom({ code, studentId });

    res.status(200).json({
      message: 'Successfully joined classroom',
      classroom,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
const getMyClassrooms = async (req, res) => {
  try {
    const userId = req.user.id;
    const role = req.user.role;

    let classrooms = [];

    if (role === 'teacher') {
      // Fetch classrooms created by teacher
      classrooms = await Classroom.findAll({
        where: { teacherId: userId },
        order: [['createdAt', 'DESC']]
      });

    } else if (role === 'student') {
      // Fetch classrooms student has joined
      const student = await User.findByPk(userId, {
        include: {
          model: Classroom,
          as: 'joinedClassrooms',
          through: { attributes: [] },
        }
      });

      classrooms = student?.joinedClassrooms || [];
    }

    res.status(200).json({ classrooms });

  } catch (error) {
    console.error('Error fetching classrooms:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



module.exports = {
  createClassroom,
  joinClassroom,
  getMyClassrooms
};
