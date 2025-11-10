const SubmissionService = require('../service/submission-serivce');
const submissionService = new SubmissionService();

const createSubmission = async (req, res) => {
  try {
    const studentId = req.user.id;
    const { assignmentId, content } = req.body;

    const submission = await submissionService.submitAssignment({ assignmentId, studentId, content });

    res.status(201).json({ message: 'Submission successful', submission });
  } catch (error) {
    console.error('Error creating submission:', error);
    return res.status(400).json({ message: error.message });
  }
};

const getMySubmission = async (req, res) => {
  try {
    const studentId = req.user.id;
    const assignmentId = req.params.assignmentId;

    const submission = await submissionService.getMySubmission({ assignmentId, studentId });

    if (!submission) {
      return res.status(404).json({ message: 'No submission found' });
    }

    res.status(200).json({ submission });
  } catch (error) {
    console.error('Error fetching submission:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getAllSubmissionsForAssignment = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const teacherId = req.user.id;

    if (req.user.role !== 'teacher') {
      return res.status(403).json({ error: 'Only teachers can view all submissions' });
    }

    const submissions = await submissionService.getSubmissionsForAssignment(assignmentId, teacherId);
    res.status(200).json(submissions);
  } catch (err) {
    console.error('Error fetching submissions:', err);
    res.status(400).json({ error: err.message });
  }
};


const gradeSubmission = async (req, res) => {
  try {

    const teacherId = req.user.id;
    const { submissionId } = req.params;
    const { grade, feedback,assignmentId} = req.body;
    if (req.user.role !== 'teacher') {
      return res.status(403).json({ error: 'Only teachers can grade submissions' });
    }
    const updated = await submissionService.gradeSubmission({
      submissionId,
      teacherId,
      grade,
      feedback,
      assignmentId,
    });

    return res.status(200).json({ message: 'Submission graded', updated });
  } catch (err) {
    return res.status(403).json({ error: err.message });
  }
};


module.exports = {
  createSubmission,
  getMySubmission,
  getAllSubmissionsForAssignment,
  gradeSubmission
};
