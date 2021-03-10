const { Note } = require("../db/models");
const { asyncHandler, csrfProtection, deleteItem } = require("./utils");
const express = require("express");
const tasksRouter = express.Router();

tasksRouter.get('/:id', csrfProtection, asyncHandler(async (req, res) => {
  const id = req.params.id;
  const note = await Note.build()
  const notes = await Note.findAll({ where: { taskId: id } })


  res.render('notes', {
    note,
    notes,
    title: 'notes',
    id,
    csrfToken: req.csrfToken()
  }
  )

}));

tasksRouter.post('/:id', csrfProtection, asyncHandler(async (req, res) => {
  const { content } = req.body;
  const id = req.params.id;
  console.log(id, "here");
  const {
    userAuth: { userId },
  } = req.session;
  const note = await Note.create({ userId, content, taskId: id })
  res.redirect(`/tasks/${id}`)

}))


module.exports = tasksRouter;
