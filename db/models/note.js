"use strict";
module.exports = (sequelize, DataTypes) => {
	const Note = sequelize.define(
		"Note",
		{
			ownerId: {
				allowNull: false,
				type: DataTypes.INTEGER,
				references: { model: "Users" },
			},
			content: {
				allowNull: false,
				type: DataTypes.TEXT,
			},
			taskId: {
				allowNull: false,
				type: DataTypes.INTEGER,
				references: { model: "Tasks" },
			},
		},
		{}
	);
	Note.associate = function (models) {
		Note.belongsTo(models.Task, { foreignKey: "taskId" });
		Note.belongsTo(models.User, { foreignKey: "userId" });
	};
	return Note;
};
