"use strict";
module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		"User",
		{
			firstName: {
				allowNull: false,
				type: DataTypes.STRING(50),
			},
			lastName: {
				allowNull: false,
				type: DataTypes.STRING(50),
			},
			email: {
				allowNull: false,
				unique: true,
				type: DataTypes.STRING(75),
			},
			hashedPassword: {
				allowNull: false,
				type: DataTypes.STRING.BINARY,
			},
		},
		{}
	);
	User.associate = function (models) {
		projectMapping = {
			though: "ProjectJoin",
			foreignKey: "userId",
			otherKey: "projectId",
			as: "assignedProjects"
		}

		userMapping = {
			through: "UserJoin",
			foreignKey: "userId",
			otherKey: "contactId",
			as: "contacts"
		}

		contactMapping = {
			through: "UserJoin",
			foreignKey: "contactId",
			otherKey: "userId",
			as: "projectOwners"
		}

		tasksMapping = {
			through: "TaskJoin",
			foreignKey: "userId",
			otherKey: "taskId"
		}

		User.hasMany(models.Project, { foreignKey: "projectOwnerId", as: "ownedProjects" });
		User.hasMany(models.Note, { foreignKey: "userId" });
		User.belongsToMany(models.User, userMapping);
		User.belongsToMany(models.User, contactMapping);
		User.belongsToMany(models.Project, projectMapping);
		User.belongsToMany(models.Task, tasksMapping);
	};
	return User;
};
