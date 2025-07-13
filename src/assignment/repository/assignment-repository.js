const { Assignment } = require('../../models');

const createAssignment = async(data) =>{
    console.log('📦 Creating assignment with data:', data);
    return await Assignment.create(data)
};

const getAssignmentsByClassroom = async (classroomId) => {
    return await Assignment.findAll({ where: { classroomId }, order: [['dueDate', 'ASC']] });
}

module.exports = {
  createAssignment,
  getAssignmentsByClassroom
};
