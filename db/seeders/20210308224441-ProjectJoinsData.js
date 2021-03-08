"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			"ProjectJoins",
			[
				{ projectId: 1, userId: 1, createdAt: new Date(), updatedAt: new Date() },
				{ projectId: 1, userId: 2, createdAt: new Date(), updatedAt: new Date() },
				{ projectId: 1, userId: 3, createdAt: new Date(), updatedAt: new Date() },
			],
			{}
		);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("ProjectJoins", null, {});
	},
};
