const { Assignment, Classroom, ClassroomStudent, Subject } = require('../../models');

const createAssignment = async (req, res) => {
  try {
    const { title, description, dueDate, classroomId, subjectId } = req.body;
    const teacherId = req.user.id;

    const classroom = await Classroom.findByPk(classroomId);
    if (!classroom) {
      return res.status(404).json({ message: 'Classroom not found' });
    }

    const subject = await Subject.findByPk(subjectId);
    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    const assignment = await Assignment.create({
      title,
      description,
      dueDate,
      classroomId,
      subjectId,
      teacherId,
    });

    res.status(201).json(assignment);
  } catch (error) {
    console.error('Error creating assignment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getAssignmentsByClassroom = async (req, res) => {
  try {
    const user = req.user;
    let assignments;

    if (user.role === 'teacher') {
      assignments = await Assignment.findAll({
        include: [
          {
            model: Classroom,
            where: { teacherId: user.id },
            required: true,
          },
          {
            model: Subject,
            as: 'subject',
            attributes: ['id', 'name', 'code'],
          },
        ],
      });

    } else if (user.role === 'student') {
      const studentClassrooms = await ClassroomStudent.findAll({
        where: { studentId: user.id },
        attributes: ['classroomId'],
      });

      const classroomIds = studentClassrooms.map(sc => sc.classroomId);

      
      if (classroomIds.length === 0) {
        return res.status(403).json({ message: 'You have not joined any classroom yet' });
      }

      assignments = await Assignment.findAll({
        where: { classroomId: classroomIds },
        include: [
          Classroom,
          {
            model: Subject,
            as: 'subject',
            attributes: ['id', 'name', 'code'],
          },
        ],
      });

    } else {
      return res.status(403).json({ message: 'Unauthorized role' });
    }

    return res.status(200).json(assignments);
  } catch (error) {
    console.error('Error fetching assignments:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createAssignment,
  getAssignmentsByClassroom,
};
