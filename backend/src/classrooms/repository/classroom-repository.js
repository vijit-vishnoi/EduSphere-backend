const { Classroom, ClassroomStudent } = require('../../models');

class ClassroomRepository {
  async create({ name, description, allowJoinWithCode, code, teacherId }) {
  return await Classroom.create({ 
    name,
    description,
    allowJoinWithCode,
    code,
    teacherId
  });
}

  async findByCode(code) {
    return await Classroom.findOne({ where: { code } });
  }

  async hasStudentJoined(classroomId, studentId) {
    return await ClassroomStudent.findOne({ where: { classroomId, studentId } });
  }

  async addStudentToClassroom(classroomId, studentId) {
    return await ClassroomStudent.create({ classroomId, studentId });
  }
  async removeStudentFromClassroom(classroomId, studentId) {
    return await ClassroomStudent.destroy({
      where: {
        classroomId,
        studentId,
      },
    });
  }
  async findById(id) {
  const classroom = await Classroom.findByPk(id);
  return classroom;
}

  async findAllByTeacherId(teacherId) {
  return await Classroom.findAll({
    where: { teacherId },
    order: [['createdAt', 'DESC']]
  });
}

async findAllByStudentId(studentId) {
  return await Classroom.findAll({
    include: {
      model: ClassroomStudent,
      where: { studentId }
    },
    order: [['createdAt', 'DESC']]
  });
}

}

module.exports = ClassroomRepository;
