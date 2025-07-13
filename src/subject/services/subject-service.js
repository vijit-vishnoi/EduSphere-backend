const { Subject } = require('../../models');

exports.getAllSubjects = () => Subject.findAll();

exports.createSubject = (data) => Subject.create(data);

exports.updateSubject = async (id, data) => {
  const subject = await Subject.findByPk(id);
  if (!subject) throw new Error('Subject not found');
  return subject.update(data);
};

exports.deleteSubject = async (id) => {
  const subject = await Subject.findByPk(id);
  if (!subject) throw new Error('Subject not found');
  return subject.destroy();
};
