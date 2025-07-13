'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Classrooms', 'subject');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Classrooms', 'subject', {
      type: Sequelize.STRING,
    });
  },
};
