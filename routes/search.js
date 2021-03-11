const express = require("express");
const { requireAuth } = require("../auth");
const { Op } = require("sequelize");
const { Project, Task, Note, User } = require("../db/models");
const { asyncHandler, deleteItem, findCurrentUser, findCurrentProjectId } = require("./utils");
const searchRouter = express.Router();

searchRouter.post(
	"/",
	requireAuth,
	asyncHandler(async (req, res, next) => {
		const { searchText } = req.body;
		const allSearchProjects = await Project.findAll();
		console.log(
			allSearchProjects.map((project) => {
				return project.dataValues;
			})
		);
		// const allResults = [allSearchProjects]
		res.redirect("/projects");
	})
);

module.exports = searchRouter;

// { where: { [Op.iLike]: searchText } }
