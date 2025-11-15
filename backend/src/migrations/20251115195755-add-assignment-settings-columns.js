module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Assignments', 'points', {
      type: Sequelize.INTEGER,
      defaultValue: 100,
    });

    await queryInterface.addColumn('Assignments', 'allowLateSubmissions', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });

    await queryInterface.addColumn('Assignments', 'requireTextSubmission', {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    });

    await queryInterface.addColumn('Assignments', 'requireFileUpload', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Assignments', 'points');
    await queryInterface.removeColumn('Assignments', 'allowLateSubmissions');
    await queryInterface.removeColumn('Assignments', 'requireTextSubmission');
    await queryInterface.removeColumn('Assignments', 'requireFileUpload');
  }
};
