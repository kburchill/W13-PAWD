const express = require("express");
const apiTaskRouter = express.Router();
const { requireAuth } = require("../auth");
const { Task, Project } = require("../db/models");
const { asyncHandler, deleteItem, findCurrentProjectId } = require("./utils");

apiTaskRouter.delete(
	"/",
	requireAuth,
	asyncHandler(async (req, res) => {
		const { taskEventId, urlId } = req.body;
		const task = await Task.findByPk(taskEventId);
		const currentTask = urlId[1] === "task" ? urlId[0] : null;

		// REDIRECT BACK TO PROJECT/ID page if you delete current task from inside notes
		let currentProjectId = await findCurrentProjectId(urlId);

		try {
			await deleteItem(taskEventId, Task);
		} catch (error) {
			console.log(error);
			// use next(error) and fix up if you want to allow non Owners to delete project
		}

		const allTasks = await Task.findAll({ where: { projectId: task.projectId } });
		res.json([allTasks, currentTask, currentProjectId]);
	})
);

apiTaskRouter.post(
	"/",
	requireAuth,
	asyncHandler(async (req, res) => {
		const { name, priority, projectId } = req.body;
		let error = "";
		try {
			if (name.length > 1) await Task.create({ name, priority, projectId });
		} catch (err) {
			console.error(err);
		}
		const tasks = await Task.findAll({ where: { projectId } });
		res.json(tasks);
	})
);

module.exports = apiTaskRouter;
