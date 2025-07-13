'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Classroom extends Model {
    static associate(models) {
      // ✅ Class teacher (main teacher who owns the class)
      Classroom.belongsTo(models.User, {
        foreignKey: 'teacherId',
        as: 'classTeacher',
      });

      // ✅ Students enrolled in this classroom
      Classroom.belongsToMany(models.User, {
        through: models.ClassroomStudent,
        foreignKey: 'classroomId',
        otherKey: 'studentId',
        as: 'students',
      });

      // ✅ Assignments in this classroom
      Classroom.hasMany(models.Assignment, {
        foreignKey: 'classroomId',
        as: 'assignments',
      });
    }
  }

  Classroom.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      teacherId: {
        type: DataTypes.INTEGER,
        allowNull: false, // class must have a class teacher
      },
    },
    {
      sequelize,
      modelName: 'Classroom',
    }
  );

  return Classroom;
};
