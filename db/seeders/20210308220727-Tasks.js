'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Tasks', [
        {
        name: "Determine restful routes",
        startDate: new Date(),
        dueDate: new Date(),
        priority: 1,
        inProgress: true,
        projectId: 1,
        completed: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Organize routes in routers",
        startDate: new Date(),
        dueDate: new Date(),
        priority: 2,
        inProgress: true,
        projectId: 1,
        completed: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Create validators",
        startDate: new Date(),
        dueDate: new Date(),
        priority: 3,
        completed: true,
        inProgress: true,
        projectId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Write logic in route handlers",
        startDate: new Date(),
        dueDate: new Date(),
        priority: 1,
        inProgress: true,
        projectId: 1,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Determine restful routes",
        startDate: new Date(),
        dueDate: new Date(),
        priority: 1,
        inProgress: true,
        projectId: 2,
        completed: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Organize Api routers",
        startDate: new Date(),
        dueDate: new Date(),
        priority: 1,
        inProgress: true,
        projectId: 2,
        completed: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Set up front end scripts",
        startDate: new Date(),
        dueDate: new Date(),
        priority: 1,
        inProgress: true,
        projectId: 2,
        completed: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Create Pug",
        startDate: new Date(),
        dueDate: new Date(),
        priority: 2,
        inProgress: true,
        projectId: 2,
        completed: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Write logic in API routes",
        startDate: new Date(),
        dueDate: new Date(),
        priority: 2,
        inProgress: true,
        projectId: 2,
        completed: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Write front-end logic",
        startDate: new Date(),
        dueDate: new Date(),
        priority: 2,
        inProgress: true,
        projectId: 2,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Implement AJAX",
        startDate: new Date(),
        dueDate: new Date(),
        priority: 2,
        inProgress: true,
        projectId: 2,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Determine over-all ux/ui design",
        startDate: new Date(),
        dueDate: new Date(),
        priority: 1,
        inProgress: true,
        projectId: 3,
        completed: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Cry",
        startDate: new Date(),
        dueDate: new Date(),
        priority: 3,
        inProgress: true,
        projectId: 3,
        completed: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Start general layout add divs that are needed",
        startDate: new Date(),
        dueDate: new Date(),
        priority: 2,
        inProgress: true,
        projectId: 3,
        completed: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Cry again",
        startDate: new Date(),
        dueDate: new Date(),
        priority: 3,
        inProgress: true,
        projectId: 3,
        completed: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Try to use Css to implement design",
        startDate: new Date(),
        dueDate: new Date(),
        priority: 1,
        inProgress: true,
        projectId: 3,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Weep",
        startDate: new Date(),
        dueDate: new Date(),
        priority: 3,
        inProgress: true,
        projectId: 3,
        completed: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Realize the site looks like it's from the 90s",
        startDate: new Date(),
        dueDate: new Date(),
        priority: 1,
        inProgress: true,
        projectId: 3,
        completed: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Try harder to implement design",
        startDate: new Date(),
        dueDate: new Date(),
        priority: 1,
        inProgress: true,
        projectId: 3,
        completed: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Put a sweet background image in to hide my CSS",
        startDate: new Date(),
        dueDate: new Date(),
        priority: 1,
        inProgress: true,
        projectId: 3,
        completed: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Weep longer",
        startDate: new Date(),
        dueDate: new Date(),
        priority: 3,
        inProgress: true,
        projectId: 3,
        completed: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Settle for the 90s",
        startDate: new Date(),
        dueDate: new Date(),
        priority: 2,
        inProgress: true,
        projectId: 3,
        completed: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Allow confidence in full-stack ability to be shaken",
        startDate: new Date(),
        dueDate: new Date(),
        priority: 3,
        inProgress: true,
        projectId: 3,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Look up CSS memes and realize you're not alone",
        startDate: new Date(),
        dueDate: new Date(),
        priority: 1,
        inProgress: true,
        projectId: 3,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      ], {});

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Tasks', null, {});

  }
};
