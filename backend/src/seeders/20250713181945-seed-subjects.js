module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Subjects', [
      { name: 'Physics', code: 'PHY', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Chemistry', code: 'CHE', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Mathematics', code: 'MTH', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Subjects', null, {});
  },
};
