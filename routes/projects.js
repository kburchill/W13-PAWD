const { Project, Task } = require("../db/models");
const { asyncHandler, csrfProtection, deleteItem } = require("./utils");
const express = require("express");
const { requireAuth } = require("../auth");
const projectsRouter = express.Router();

// const { projectValidators } = require("./validators"); not created yet

projectsRouter.get(
	"/",
	csrfProtection,
	asyncHandler(async (req, res) => {
		const project = await Project.build();
		const projects = await Project.findAll();

		res.render("project", {
			title: "Projects",
			project,
			projects,
			csrfToken: req.csrfToken(),
		});
	})
);

projectsRouter.post(
	"/",
	csrfProtection,
	// projectValidators,
	asyncHandler(async (req, res) => {
		const { projectName } = req.body;
		const {
			userAuth: { userId },
		} = req.session;
		console.log(userId);
		const project = await Project.create({ name: projectName, progress: 0, projectOwnerId: userId });
		res.redirect("/projects");
	})
);

// projectsRouter.get('/:id(\\d+)', csrfProtection, asyncHandler(async (req, res) => {
// 	const projectId = parseInt(req.params.id, 10);
// 	const project = await Project.findByPk(projectId)		//pass in csrfTOken
// }))

projectsRouter.post(
	"/delete/:id(\\d+)",
	csrfProtection,
	requireAuth,
	asyncHandler(async (req, res) => {
		const projectId = parseInt(req.params.id, 10);

		await deleteItem(projectId, Project);
		res.redirect("/projects"); //maybe switch to AJAX if we have time
	})
);

projectsRouter.get(
	"/:id(\\d+)",
	csrfProtection,
	asyncHandler(async (req, res) => {
		const tasks = await Task.findAll({ where: { projectId: req.params.id } });
		console.log(tasks);

		res.render("task", { tasks, title: "Tasks", csrfToken: req.csrfToken() });
	})
);

module.exports = projectsRouter;
