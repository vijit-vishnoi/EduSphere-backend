const SubmissionRepository = require('../repository/submission-repository');
const { Assignment } = require('../../models');

class SubmissionService {
  constructor() {
    this.submissionRepository = new SubmissionRepository();
  }

  async submitAssignment({ assignmentId, studentId, content }) {
    const assignment = await Assignment.findByPk(assignmentId);
    if (!assignment) throw new Error('Assignment not found');

    const alreadySubmitted = await this.submissionRepository.findByAssignmentAndStudent(
      assignmentId,
      studentId
    );
    if (alreadySubmitted) throw new Error('You have already submitted this assignment');

    const submission = await this.submissionRepository.create({
      assignmentId,
      studentId,
      content,
      submittedAt: new Date(),
    });

    return submission;
  }
   async getMySubmission({ assignmentId, studentId }) {
    return await this.submissionRepository.findByAssignmentAndStudent(assignmentId, studentId);
  }
  async getSubmissionsForAssignment(assignmentId) {
    return await this.submissionRepository.findByAssignmentId(assignmentId);
  }
}

module.exports = SubmissionService;
