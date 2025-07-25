'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    
    
    static associate(models) {
      User.hasMany(models.Classroom, {
    foreignKey: 'teacherId',
    as: 'createdClassrooms'
  });

  User.belongsToMany(models.Classroom, {
    through: models.ClassroomStudent,
    foreignKey: 'studentId',
    otherKey: 'classroomId',
    as: 'joinedClassrooms'
  });
  User.hasMany(models.Comment, {
    foreignKey: 'userId',
    as: 'comments'
  });
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};