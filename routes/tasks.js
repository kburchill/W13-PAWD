const { Note, Task, Project } = require("../db/models");
const { asyncHandler, csrfProtection, deleteItem, findCurrentUser, grabAll } = require("./utils");
const express = require("express");
const { requireAuth } = require('../auth');
const tasksRouter = express.Router();

tasksRouter.get('/:id', requireAuth, asyncHandler(async (req, res) => {
  const taskId = req.params.id;
  const editNote = "";
  const values = await grabAll(taskId, req.session, editNote);

  res.render('notes', values);

}));

// post to get edit form
tasksRouter.post('/:id', requireAuth, asyncHandler(async (req, res) => {
  const { noteId } = req.body
  const editNote = await Note.findByPk(noteId);
  const taskId = editNote.taskId;
  const values = await grabAll(taskId, req.session, editNote);

  res.render('notes', values);

}))


module.exports = tasksRouter;
