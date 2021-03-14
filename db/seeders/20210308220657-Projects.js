"use strict";
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			"Projects",
			[
				{ name: "Front-end routes", projectOwnerId: 1, createdAt: new Date(), updatedAt: new Date() },
				{ name: "Api/AJAX", projectOwnerId: 1, createdAt: new Date(), updatedAt: new Date() },
				{ name: "CSS", projectOwnerId: 1, createdAt: new Date(), updatedAt: new Date() },
			],
			{}
		);
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("Projects", null, {});
	},
};
