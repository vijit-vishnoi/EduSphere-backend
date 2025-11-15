module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Assignments', 'subjectId');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('Assignments', 'subjectId', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  }
};
