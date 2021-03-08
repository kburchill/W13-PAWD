'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Notes', [
        {content: "blah blah blah yep blah", taskId: 2, userId: 1, createdAt: new Date(), updatedAt: new Date()},
        {content: "Naruto has too many fillers", taskId: 2, userId: 2, createdAt: new Date(), updatedAt: new Date()},
        {content: "boston clam chowder is legit", taskId: 3, userId: 1, createdAt: new Date(), updatedAt: new Date()}], {});

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Notes', null, {});

  }
};
