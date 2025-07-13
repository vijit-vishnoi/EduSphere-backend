module.exports = (sequelize, DataTypes) => {
  const Submission = sequelize.define('Submission', {
    content: DataTypes.TEXT, 
    grade: DataTypes.STRING,
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    assignmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Submission.associate = (models) => {
    Submission.belongsTo(models.User, { foreignKey: 'studentId', as: 'student' });
    Submission.belongsTo(models.Assignment, { foreignKey: 'assignmentId' });
  };

  return Submission;
};
