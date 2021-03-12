const express = require("express");
const apiNoteRouter = express.Router();
const { requireAuth } = require("../auth");
const { Note, Task } = require("../db/models");
const { asyncHandler, deleteItem, findCurrentUser } = require("./utils");
const { notesValidators } = require("./validators");
const { check, validationResult } = require("express-validator");

apiNoteRouter.delete(
	"/:id",
	requireAuth,
	asyncHandler(async (req, res) => {
		const { noteId } = req.body;
		const note = await Note.findByPk(noteId);
		try {
			await deleteItem(noteId, Note);
		} catch (error) {}
		const allNotes = await Note.findAll({ where: { taskId: note.taskId } });
		res.json(allNotes);
	})
);

apiNoteRouter.post(
	"/",
	requireAuth,
	notesValidators,
	asyncHandler(async (req, res) => {
		const { content, userId, taskId } = req.body;
		const mappedErrors = validationResult(req).errors;
		const errors = mappedErrors.map((error) => error.msg);
		try {
			if (mappedErrors.length === 0) {
				await Note.create({ content, userId, taskId });
			}
		} catch (err) {
			console.err("messed up on backend note create", err);
		}
		const notes = await Note.findAll({ where: { taskId } });
		res.json([notes, errors]);
	})
);

apiNoteRouter.patch(
	"/:id",
	requireAuth,
	asyncHandler(async (req, res) => {
		const { content, taskId, noteId } = req.body;
		const userId = findCurrentUser(req.session);

		try {
			const note = await Note.findByPk(noteId);
			await note.update({ content });
		} catch (err) {
			console.err("messed up on backend note create", err);
		}
		const notes = await Note.findAll({ where: { taskId } });
		res.json(notes);
	})
);

module.exports = apiNoteRouter;
