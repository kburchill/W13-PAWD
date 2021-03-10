const { User, Note, Task } = require("../db/models");
const { asyncHandler, csrfProtection, deleteItem } = require("./utils");
const express = require("express");
const notesRouter = express.Router();

notesRouter.get('/', csrfProtection, asyncHandler(async (req, res) => {
  const note = await Note.build()
  const notes = await Note.findAll({ where: req.params.projectId })  //placeholder until we figure out correct query

  res.render('notes', {
    note,
    notes,
    title: 'notes',
    csrfToken: req.csrfToken()
  }
  )
}));

notesRouter.post('/', csrfProtection, asyncHandler(async (req, res) => {
  const { userId, content, taskId } = req.body;

  const note = await Note.create({ userId, content, taskId })
  res.redirect('/projects/:id/tasks/:id/notes')   //seeing ALL notes once you create a note

}))


module.exports = { notesRouter }
