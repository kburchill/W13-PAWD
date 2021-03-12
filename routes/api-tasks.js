const express = require("express");
const apiTaskRouter = express.Router();
const { requireAuth } = require("../auth");
const { Task, Project } = require("../db/models");
const { asyncHandler, deleteItem, findCurrentProjectId } = require("./utils");
const { check, validationResult } = require("express-validator");
const { taskValidators } = require("./validators");

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
	taskValidators,
	asyncHandler(async (req, res) => {
		const { name, priority, projectId } = req.body;
		const mappedErrors = validationResult(req).errors;
		const errors = mappedErrors.map((error) => error.msg);
		let error = "";
		try {
			if (name.length >= 1 && name.length < 101) await Task.create({ name, priority, projectId });
			else error = errors[0];
		} catch (err) {
			console.error(err);
		}
		const tasks = await Task.findAll({ where: { projectId } });
		res.json([tasks, error]);
	})
);

apiTaskRouter.patch(
	"/",
	requireAuth,
	taskValidators,
	asyncHandler(async (req, res) => {
		// console.log(req.body, "REQ.BOD==============================");
		const { taskId, inProgress, completed, priority, name } = req.body;
		const mappedErrors = validationResult(req).errors;
		const errors = mappedErrors.map((error) => error.msg);
		const task = await Task.findByPk(taskId);
		const projectId = task.projectId;
		let error = "";
		try {
			// console.log("THIS HAPPENED===============================");
			if (name && name.length >= 1 && name.length < 101) await task.update({ name });
			if (inProgress === null) await task.update({ inProgress: false });
			else if (inProgress === "on") await task.update({ inProgress: true });
			if (completed === null) await task.update({ completed: false });
			else if (completed === "on") await task.update({ completed: true });
			if (priority) await task.update({ priority });
			else error = errors[0];
		} catch (err) {
			console.error(err);
		}
		const tasks = await Task.findAll({ where: { projectId } });
		res.json([tasks, error]);
	})
);

module.exports = apiTaskRouter;
