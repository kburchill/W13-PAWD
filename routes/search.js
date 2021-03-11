const express = require("express");
const { requireAuth } = require("../auth");
const { Op } = require("sequelize");
const { Project, Task, Note, User } = require("../db/models");
const { asyncHandler, deleteItem, findCurrentUser, findCurrentProjectId } = require("./utils");
const searchRouter = express.Router();

searchRouter.post(
	"/",
	requireAuth,
	asyncHandler(async (req, res, next) => {
		const { searchText } = req.body;
		const projectOwnerId = findCurrentUser(req.session);
		// looks for all existing projects with name of search text of current user
		const allSearchProjects = await Project.findAll({
			where: {
				name: { [Op.iLike]: `%${searchText}%` },
				projectOwnerId,
			},
			include: [{ model: Task }],
		});
		const allSearchProjectsResults = allSearchProjects.map((project) => project.dataValues);
		// grabs all existing project ids of the current user
		const allProjectId = allSearchProjectsResults.map((project) => project.id);
		// looks for all tasks of the current user with that term in name
		const allSearchTasks = await Task.findAll({
			where: {
				[Op.and]: [
					{
						name: { [Op.iLike]: `%${searchText}%` },
						projectId: allProjectId,
					},
				],
			},
		});
		const allSearchTasksResults = allSearchTasks.map((task) => task.dataValues);

		const projects = await Project.findAll({ where: { projectOwnerId } });
		res.render("search", {
			title: "Search Results",
			allSearchProjectsResults,
			allSearchTasksResults,
			projects,
		});
	})
);

module.exports = searchRouter;
