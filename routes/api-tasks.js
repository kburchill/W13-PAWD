const express = require("express");
const apiTaskRouter = express.Router();
const { requireAuth } = require("../auth");
const { Task, Project } = require("../db/models");
const { asyncHandler, deleteItem } = require("./utils");

apiTaskRouter.delete(
	"/",
	requireAuth,
	asyncHandler(async (req, res) => {
		const { taskEventId, urlId } = req.body;

		// REDIRECT BACK TO PROJECT/ID page if you delete current task from inside notes
		let currentProjectId;
		if (urlId[1] === "task" && urlId[0]) {
			const task = await Task.findByPk(urlId[0]);
			currentProjectId = task.projectId;
		} else currentProjectId = urlId[0];

		const task = await Task.findByPk(taskEventId);

		try {
			await deleteItem(taskEventId, Task);
		} catch (error) {
			console.log(error);
		}

		const allTasks = await Task.findAll({ where: { projectId: task.projectId } });
		res.json([allTasks, currentProjectId]);
	})
);

module.exports = apiTaskRouter;
