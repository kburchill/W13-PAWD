const { Project } = require("../db/models");
const { asyncHandler, csrfProtection } = require("./utils");
const express = require("express");
const projectsRouter = express.Router();

// const { userValidators } = require("./validators");

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

module.exports = projectsRouter;
