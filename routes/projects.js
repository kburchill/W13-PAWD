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

projectsRouter.post('/:id(\\d+)', requireAuth, asyncHandler(async (req, res) => {
	const{ name, priority } = req.body;
	const{ id } = req.params;
	const userId = findCurrentUser(req.session);
	await Task.create({ name, priority, projectId: id });

	res.redirect(`/projects/${id}`)
}))


projectsRouter.get(
	"/:id(\\d+)",
	asyncHandler(async (req, res) => {
		const projectId = req.params.id;
		const tasks = await Task.findAll({ where: { projectId } });
		const project = await Project.build();
		const projects = await Project.findAll({ where: { projectOwnerId: findCurrentUser(req.session) } });

		res.render("task", { tasks, title: "Tasks", projectId, project, projects });
	})
);

module.exports = projectsRouter;
