"use strict";
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			"Projects",
			[
				{ name: "onejoe", progress: 10, projectOwnerId: 1, createdAt: new Date(), updatedAt: new Date() },
				{ name: "twojohn", progress: 10, projectOwnerId: 1, createdAt: new Date(), updatedAt: new Date() },
				{ name: "twojohn", progress: 10, projectOwnerId: 2, createdAt: new Date(), updatedAt: new Date() },
			],
			{}
		);
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("Projects", null, {});
	},
};
