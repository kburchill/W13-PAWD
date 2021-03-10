const { Project, Task } = require("../db/models");
const { asyncHandler, csrfProtection, deleteItem, findCurrentUser } = require("./utils");
const express = require("express");
const { requireAuth } = require("../auth");
const projectsRouter = express.Router();

// const { projectValidators } = require("./validators"); not created yet

projectsRouter.use(requireAuth);

projectsRouter.get(
	"/",
	asyncHandler(async (req, res) => {
		const project = await Project.build();
		const projects = await Project.findAll({ where: { projectOwnerId: findCurrentUser(req.session) } });

		res.render("project", {
			title: "Projects",
			project,
			projects,
		});
	})
);

projectsRouter.post(
	"/",
	// projectValidators,
	asyncHandler(async (req, res) => {
		const { projectName } = req.body;
		userId = findCurrentUser(req.session);
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
	asyncHandler(async (req, res) => {
		const projectId = parseInt(req.params.id, 10);

		await deleteItem(projectId, Project);
		res.redirect("/projects"); //maybe switch to AJAX if we have time
	})
);

projectsRouter.get(
	"/:id(\\d+)",
	asyncHandler(async (req, res) => {
		const tasks = await Task.findAll({ where: { projectId: req.params.id } });
		console.log(tasks);

		res.render("task", { tasks, title: "Tasks" });
	})
);

module.exports = projectsRouter;
