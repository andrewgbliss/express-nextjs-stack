export default {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'accounts',
      [
        {
          name: 'Developers',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Test Account',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('accounts', null, {});
  },
};
