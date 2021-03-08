'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Tasks', [
        {
        name: "sample task 1",
        startDate: new Date(),
        dueDate: new Date(),
        priority: 1,
        inProgress: true,
        projectId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "sample task 2",
        startDate: new Date(),
        dueDate: new Date(),
        priority: 2,
        inProgress: false,
        projectId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "sample task 3",
        startDate: new Date(),
        dueDate: new Date(),
        priority: 3,
        inProgress: true,
        projectId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Tasks', null, {});

  }
};
