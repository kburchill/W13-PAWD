'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Notes', [
        {content: "Remember Restful is only convention but if you don't follow it you will not get a job. . . your choice.", taskId: 1, userId: 1, createdAt: new Date(), updatedAt: new Date()},
        {content: "You won't beable to create enough divs for your future css. . . also are we doing BEM, psudo-BEM, our own convention or just a mix of all of it. . .probably a mix", taskId: 8, userId: 1, createdAt: new Date(), updatedAt: new Date()},
        {content: "AJAX is not only great for websites but also to season your steak!", taskId: 11, userId: 1, createdAt: new Date(), updatedAt: new Date()},
        {content: "Remember there are libraries for this", taskId: 23, userId: 1, createdAt: new Date(), updatedAt: new Date()},
        {content: "Yes but I'm supposed to be full stack. . .besides someone needs to write the libraries", taskId: 23, userId: 1, createdAt: new Date(), updatedAt: new Date()},
        {content: "Look at this way: CSS is a solved problem. . . so jump into those libraries", taskId: 23, userId: 1, createdAt: new Date(), updatedAt: new Date()},
        {content: "No! I refuse, I will distinguish myself by learning CSS", taskId: 23, userId: 1, createdAt: new Date(), updatedAt: new Date()},
        {content: "There is always Youtube", taskId: 23, userId: 1, createdAt: new Date(), updatedAt: new Date()}
      ], {});


  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Notes', null, {});

  }
};
