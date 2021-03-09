const { Project } = require("../db/models");
const { restoreUser } = require("../auth");
const { asyncHandler, csrfProtection } = require("./utils");
const express = require("express");
const projectsRouter = express.Router();

// const { userValidators } = require("./validators");

projectsRouter.get(
	"/",
	csrfProtection,
	restoreUser,
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
	restoreUser,
	// projectValidators,
	asyncHandler(async (req, res) => {
		const { projectName } = req.body;
		console.log(projectName);
		const {
			userAuth: { userId },
		} = req.session;

		const project = await Project.create({ name: projectName, progress: 0, projectOwnerId: userId });
	})
);

module.exports = projectsRouter;
