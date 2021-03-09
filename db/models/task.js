"use strict";
module.exports = (sequelize, DataTypes) => {
	const Task = sequelize.define(
		"Task",
		{
			name: {
				allowNull: false,
				type: DataTypes.STRING(100),
			},
			startDate: {
				type: DataTypes.DATE,
			},
			dueDate: {
				type: DataTypes.DATE,
			},
			priority: {
				type: DataTypes.INTEGER,
			},
			inProgress: {
				defaultValue: false,
				allowNull: false,
				type: DataTypes.BOOLEAN,
			},
			projectId: {
				allowNull: false,
				type: DataTypes.INTEGER,
			},
		},
		{}
	);
	Task.associate = function (models) {
		const columnMapping = {
			through: "TaskJoin",
			foreignKey: "taskId",
			otherKey: "userId",
		};

		Task.belongsTo(models.Project, { foreignKey: "projectId" });
		Task.hasMany(models.Note, { foreignKey: "taskId" });
		Task.belongsToMany(models.User, columnMapping);
	};
	return Task;
};
