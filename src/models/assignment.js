module.exports = (sequelize, DataTypes) => {
  const Assignment = sequelize.define('Assignment', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: DataTypes.TEXT,
    dueDate: DataTypes.DATE,
    classroomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    teacherId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    subjectId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Subjects',
      key: 'id',
  },
}

  });

  Assignment.associate = (models) => {
    Assignment.belongsTo(models.Subject, {
    foreignKey: 'subjectId', as: 'subject'});
    Assignment.belongsTo(models.User, { foreignKey: 'teacherId', as: 'teacher' });
    Assignment.belongsTo(models.Classroom, { foreignKey: 'classroomId' });
    Assignment.hasMany(models.Submission, { foreignKey: 'assignmentId' });
    Assignment.hasMany(models.Comment, {
    foreignKey: 'assignmentId',
    as: 'comments'
  });
  };

  return Assignment;
};
