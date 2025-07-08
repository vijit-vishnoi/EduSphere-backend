'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Classroom extends Model {
    static associate(models) {
      
      Classroom.belongsTo(models.User, {
        foreignKey: 'teacherId',
        as: 'teacher'
      });

      Classroom.belongsToMany(models.User, {
        through: models.ClassroomStudent,
        foreignKey: 'classroomId',
        otherKey: 'studentId',
        as: 'students'
      });
    }
  }

  Classroom.init({
    name: DataTypes.STRING,
    subject: DataTypes.STRING,
    code: DataTypes.STRING,
    teacherId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Classroom',
  });

  return Classroom;
};
