const ClassroomService = require('../services/classroom-service');
const classroomService = new ClassroomService();
const { User, Classroom } = require('../../models');

const createClassroom = async (req, res) => {
  try {
    const { name, description, allowJoinWithCode } = req.body;
    const teacherId = req.user.id;

    const classroom = await classroomService.createClassroom({
    name,
    description,
    allowJoinWithCode,
    teacherId

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
      classrooms = await Classroom.findAll({
        where: { teacherId: userId },
        order: [['createdAt', 'DESC']],
      });
    } else if (role === 'student') {
      const student = await User.findByPk(userId, {
        include: {
          model: Classroom,
          as: 'joinedClassrooms',
          through: { attributes: [] },
          include: {
            model: User,
            as: 'classTeacher', // ✅ Correct alias
            attributes: ['id', 'name'],
          },
        },
      });

      classrooms = student?.joinedClassrooms || [];
    }

    res.status(200).json({ classrooms });
  } catch (error) {
    console.error('Error fetching classrooms:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getClassroomById = async (req, res) => {
  try {
    const classroomId = req.params.id;
    const userId = req.user.id;
    const role = req.user.role;

    const classroom = await Classroom.findByPk(classroomId, {
      include: [
        {
          model: User,
          as: 'classTeacher', // ✅ Correct alias
          attributes: ['id', 'name'],
        },
        role === 'teacher' && {
          model: User,
          as: 'students',
          attributes: ['id', 'name'],
          through: { attributes: [] },
        },
      ].filter(Boolean),
    });

    if (!classroom) {
      return res.status(404).json({ error: 'Classroom not found' });
    }

    if (role === 'student') {
      const joined = await classroom.hasStudent(userId);
      if (!joined) {
        return res.status(403).json({ error: 'You have not joined this classroom' });
      }
    }

    res.status(200).json({ classroom });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const removeStudentFromClassroom = async (req, res) => {
  try {
    const classroomId = req.params.id;
    const studentId = req.params.studentId;
    const teacherId = req.user.id;
    const role = req.user.role;

    if (role !== 'teacher') {
      return res.status(403).json({ error: 'Only teachers can remove students' });
    }

    const classroom = await Classroom.findOne({
      where: { id: classroomId, teacherId },
    });

    if (!classroom) {
      return res.status(404).json({ error: 'Classroom not found or not owned by you' });
    }

    const student = await User.findByPk(studentId);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    await classroom.removeStudent(student);

    res.status(200).json({ message: 'Student removed from classroom' });
  } catch (err) {
    console.error('Error removing student:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const leaveClassroom = async (req, res) => {
  try {
    const { classroomId } = req.body;
    const studentId = req.user.id;

    const result = await classroomService.leaveClassroom({ classroomId, studentId });

    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  createClassroom,
  joinClassroom,
  getMyClassrooms,
  getClassroomById,
  removeStudentFromClassroom,
  leaveClassroom,
};
