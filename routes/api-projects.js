const express = require("express");
const apiProjectRouter = express.Router();
const { requireAuth } = require("../auth");
const { Project, Task } = require("../db/models");
const { asyncHandler, csrfProtection, deleteItem, findCurrentUser } = require("./utils");

apiProjectRouter.delete(
	"/",
	requireAuth,
	asyncHandler(async (req, res, next) => {
		const { eventProjectId, urlId } = req.body;

		let currentProjectId;
		if (urlId[1] === "task" && urlId[0]) {
			const task = await Task.findByPk(urlId[0]);
			currentProjectId = task.projectId;
		} else {
			currentProjectId = urlId[0];
		}

		try {
			await deleteItem(eventProjectId, Project);
		} catch (error) {
			// console.log(error);
			// use next(error) and fix up if you want to allow non Owners to delete project
		}

		const allProjects = await Project.findAll({ where: { projectOwnerId: findCurrentUser(req.session) } });
		res.json([allProjects, currentProjectId]);
	})
);

module.exports = apiProjectRouter;
