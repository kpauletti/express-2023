const { hashSync } = require('bcrypt');

module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Users', [
        {
        name: 'John Doe',
        email: 'johndoe@example.com',
        passwordHash: hashSync('password', 10),
      },
      {
        name: 'Jane Doe',
        email: 'janedoe@example.com',
        passwordHash: hashSync('password', 10),
      }
    ]);
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Users', null, {});
    }
  };