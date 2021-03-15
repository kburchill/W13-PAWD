const { Project, Task } = require("../db/models");
const { asyncHandler, updateProgress, findCurrentUser } = require("./utils");
const express = require("express");
const { requireAuth } = require("../auth");
const projectsRouter = express.Router();
const { projectValidators, taskValidators } = require("./validators");
const { check, validationResult } = require("express-validator");
const e = require("express");

projectsRouter.use(requireAuth);

projectsRouter.get(
	"/",
	asyncHandler(async (req, res) => {
		// const project = await Project.build();
		const preProjects = await Project.findAll({ where: { projectOwnerId: findCurrentUser(req.session) } });

		for (project of preProjects) {
			await updateProgress(project.id)
		}

		const projects = await Project.findAll({ where: { projectOwnerId: findCurrentUser(req.session) } });
		console.log(projects, '////////////////////////')

		res.render("project", {
			title: "Projects",
			// project,
			projects,
		});
	})
);

projectsRouter.post(
	"/",
	projectValidators,
	asyncHandler(async (req, res) => {
		const mappedErrors = validationResult(req).errors;
		if (mappedErrors.length === 0) {
			const { projectName } = req.body;
			userId = findCurrentUser(req.session);
			const project = await Project.create({ name: projectName, progress: 0, projectOwnerId: userId });
			const projectId = project.id;

			return res.redirect(`/projects/${projectId}`);
		} else {
			const errors = mappedErrors.map((error) => error.msg);
			const projects = await Project.findAll({ where: { projectOwnerId: findCurrentUser(req.session) } });
			const project = await Project.build();
			res.render("project", {
				title: "Projects",
				projects,
				project,
				errors,
			});
		}
	})
);

// creates a task
projectsRouter.post(
	"/:id(\\d+)",
	requireAuth,
	taskValidators,
	asyncHandler(async (req, res) => {
		const mappedErrors = validationResult(req).errors;
		if (mappedErrors.length === 0) {
			const { name, priority } = req.body;
			const { id } = req.params;
			const userId = findCurrentUser(req.session);
			await Task.create({ name, priority, projectId: id });
		}
		res.redirect(`/projects/${id}`);
	})
);

// gets all tasks and projects
projectsRouter.get(
	"/:id(\\d+)",
	asyncHandler(async (req, res) => {
		const projectId = req.params.id;
		const {
			dataValues: { name },
		} = await Project.findByPk(projectId);

		const tasks = await Task.findAll({ where: { projectId } });
		const project = await Project.build();
		const projects = await Project.findAll({ where: { projectOwnerId: findCurrentUser(req.session) } });

		res.render("task", { tasks, title: "Tasks", projectId, project, projects, name });
	})
);

module.exports = projectsRouter;
