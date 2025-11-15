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
    points: {
      type: DataTypes.INTEGER,
      defaultValue: 100,
    },
    allowLateSubmissions: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    requireTextSubmission: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    requireFileUpload: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  Assignment.associate = (models) => {
    Assignment.belongsTo(models.User, { foreignKey: 'teacherId', as: 'teacher' });
    Assignment.belongsTo(models.Classroom, { foreignKey: 'classroomId', as: 'classroom' });
    Assignment.hasMany(models.Submission, { foreignKey: 'assignmentId' });
    Assignment.hasMany(models.Comment, { foreignKey: 'assignmentId', as: 'comments' });
  };

  return Assignment;
};
