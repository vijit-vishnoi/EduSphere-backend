const assignmentRepo = require('../repository/assignment-repository');

const createAssignment = async (body, teacherId) => {
  const data = {
    title: body.title,
    description: body.description,
    dueDate: body.dueDate,
    classroomId: body.classroomId,
    teacherId
  };
  return await assignmentRepo.createAssignment(data);
};

const getAssignmentsByClassroom = async (classroomId) => {
  return await assignmentRepo.getAssignmentsByClassroom(classroomId);
};

module.exports = {
  createAssignment,
  getAssignmentsByClassroom
};
