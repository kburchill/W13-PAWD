'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'John',
        lastName: 'Billy',
        email: 'email@email.com',
        hashedPassword: '123456',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Billy',
        lastName: 'John',
        email: 'email2@email.com',
        hashedPassword: '123456',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Billy',
        lastName: 'Bob',
        email: 'email3@email.com',
        hashedPassword: '123456',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Users', null, {});
  }
};
