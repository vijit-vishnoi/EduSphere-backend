const { Classroom } = require('../../models');
const nanoid = async () => (await import('nanoid')).nanoid;
const ClassroomRepository = require('../repository/classroom-repository');

class ClassroomService {
    constructor() {
    this.classroomRepository = new ClassroomRepository();
  }
  async createClassroom({ name, description, allowJoinWithCode, teacherId }) {
  const code = (await nanoid())(6);
  return await this.classroomRepository.create({
    name,
    description,
    allowJoinWithCode,
    code,
    teacherId
  });
}


  async joinClassroom({ studentId, code }) {
  const classroom = await this.classroomRepository.findByCode(code);
  if (!classroom) throw new Error('Invalid classroom code');
  if (!classroom.allowJoinWithCode) {
    throw new Error("Joining with code is disabled for this classroom");
  }
  const alreadyJoined = await this.classroomRepository.hasStudentJoined(
    classroom.id,
    studentId
  );
  if (alreadyJoined) throw new Error('You have already joined this classroom');

  await this.classroomRepository.addStudentToClassroom(classroom.id, studentId);
  return classroom;
  }
  async leaveClassroom({ classroomId, studentId }) {
  const classroom = await this.classroomRepository.findById(classroomId);
  if (!classroom) throw new Error('Classroom not found');

  const removed = await this.classroomRepository.removeStudentFromClassroom(
    classroomId,
    studentId
  );

  if (!removed) throw new Error('You are not enrolled in this classroom');

  return { message: 'Left classroom successfully' };
}

  async getMyClassrooms({ userId, role }) {
  if (role === 'teacher') {
    return await this.classroomRepository.findAllByTeacherId(userId);
  } else if (role === 'student') {
    return await this.classroomRepository.findAllByStudentId(userId);
  } else {
    throw new Error('Invalid role');
  }
}

}

module.exports = ClassroomService;
