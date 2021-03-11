const express = require("express");
const apiProjectRouter = express.Router();
const { requireAuth } = require("../auth");
const { Project } = require("../db/models");
const { asyncHandler, deleteItem, findCurrentUser } = require("./utils");

apiProjectRouter.delete(
	"/",
	requireAuth,
	asyncHandler(async (req, res, next) => {
		const projectId = req.body.projectId;
		console.log(projectId, "api-Projects.js");
		try {
			await deleteItem(projectId, Project);
		} catch (error) {
			// console.log(error);
			// use next(error) and fix up if you want to allow non Owners to delete project
		}
		const allProjects = await Project.findAll({ where: { projectOwnerId: findCurrentUser(req.session) } });
		res.json(allProjects);
	})
);

module.exports = apiProjectRouter;
