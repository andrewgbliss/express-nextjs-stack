export default {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'users',
      [
        {
          accountId: 1,
          email: 'dev@test.com',
          password:
            '$2a$10$onYlRIHDNLs4a0mb0ft.8uSl1hjW1ThoZVuyEh3LdBPzGrcGZKEzu',
          verified: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          accountId: 2,
          email: 'account@test.com',
          password:
            '$2a$10$onYlRIHDNLs4a0mb0ft.8uSl1hjW1ThoZVuyEh3LdBPzGrcGZKEzu',
          verified: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
