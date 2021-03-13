const { Note, Task, Project } = require("../db/models");
const { asyncHandler, csrfProtection, deleteItem, findCurrentUser, grabAll } = require("./utils");
const express = require("express");
const { requireAuth } = require("../auth");
const tasksRouter = express.Router();

// get all notes
tasksRouter.get(
	"/:id",
	requireAuth,
	asyncHandler(async (req, res) => {
		const taskId = req.params.id;
		const editNote = "";
		// needs to create a task patch form
		//
		// grab all- grabs all notes, and projects, tasks, of the current user to populate notes pug
		// note, project build.
		const values = await grabAll(taskId, req.session, editNote);
		res.render("notes", values);
	})
);

// post to get note edit form
tasksRouter.post(
	"/:id",
	requireAuth,
	asyncHandler(async (req, res) => {
		const { noteId } = req.body;
		const editNote = await Note.findByPk(noteId);
		const taskId = editNote.taskId;
		const values = await grabAll(taskId, req.session, editNote);

		res.render("notes", values);
	})
);

module.exports = tasksRouter;
