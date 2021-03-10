const { Note, Task, Project } = require("../db/models");
const { asyncHandler, csrfProtection, deleteItem, findCurrentUser } = require("./utils");
const express = require("express");
const { requireAuth } = require('../auth');
const tasksRouter = express.Router();

tasksRouter.get('/:id', requireAuth, asyncHandler(async (req, res) => {
  const taskId = req.params.id;
  const note = await Note.build()
  const project = await Project.build();
  const task = await Task.findByPk(taskId)
  const { projectId } = task
  const notes = await Note.findAll({ where: { taskId } })
  const tasks = await Task.findAll({ where: { projectId } });
  const projects = await Project.findAll({ where: { projectOwnerId: findCurrentUser(req.session) } });


  res.render('notes', {
    note,
    notes,
    title: 'notes',
    taskId,
    tasks,
    projects,
    project,
    projectId
  }
  )

}));

tasksRouter.post('/:id', asyncHandler(async (req, res) => {
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
