'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Assignments', 'subjectId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Subjects',
        key: 'id',
      }
    });

    await queryInterface.sequelize.query(
      `UPDATE Assignments SET subjectId = 1`
    );

    await queryInterface.changeColumn('Assignments', 'subjectId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Subjects',
        key: 'id',
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Assignments', 'subjectId');
  }
};
