'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Classroom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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