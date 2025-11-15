module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Classrooms", "description", {
      type: Sequelize.TEXT,
      allowNull: true,
    });

    await queryInterface.addColumn("Classrooms", "allowJoinWithCode", {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Classrooms", "description");
    await queryInterface.removeColumn("Classrooms", "allowJoinWithCode");
  },
};
