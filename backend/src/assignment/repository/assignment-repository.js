const { Assignment } = require('../../models');

const createAssignment = async (data) => {
  return Assignment.create(data);
};

const getAssignmentsByClassroom = async (classroomId) => {
  return Assignment.findAll({
    where: { classroomId },
    order: [['dueDate', 'ASC']],
  });
};

module.exports = {
  createAssignment,
  getAssignmentsByClassroom,
};
