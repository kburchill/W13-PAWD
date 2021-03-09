"use strict";
module.exports = (sequelize, DataTypes) => {
	const Project = sequelize.define(
		"Project",
		{
			name: {
				allowNull: false,
				type: DataTypes.STRING(100),
			},
			progress: {
				allowNull: false,
				type: DataTypes.INTEGER,
			},
			projectOwnerId: {
				allowNull: false,
				type: DataTypes.INTEGER,
				references: { model: "Users" },
			},
		},
		{}
	);
	Project.associate = function (models) {
		const columnMapping = {
			through: "ProjectJoin",
			foreignKey: "projectId",
			otherKey: "userId",
			as: "assignedUsers",
		};

		Project.belongsTo(models.User, { foreignKey: "projectOwnerId", as: "projectOwner" });
		Project.belongsToMany(models.User, columnMapping);
		Project.hasMany(models.Task, { foreignKey: "projectId" });
	};
	return Project;
};
