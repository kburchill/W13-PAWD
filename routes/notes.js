const { Note, Task, Project } = require("../db/models");
const { asyncHandler, csrfProtection, deleteItem, findCurrentUser } = require("./utils");
const express = require("express");
const { requireAuth } = require('../auth');
const notesRouter = express.Router();

notesRouter.use(requireAuth);

notesRouter.get('/:id', asyncHandler(async (req, res) => {

    const { id } = req.params;
    const note = await Note.build();
    const project = await Project.build();
    const editNote = await Note.findByPk(id);
    const userId = findCurrentUser(req.session);
    const projects = await Project.findAll({ where: { projectOwnerId: userId } });
    const taskId = editNote.taskId;
    const task = await Task.findByPk(taskId);
    const notes = await Note.findAll({ where: { taskId: taskId } });
    const projectId = task.projectId;
    const tasks = await Task.findAll({ where: { projectId } });

    res.render('notes', {
    note,
    notes,
    title: 'notes',
    taskId,
    tasks,
    projects,
    project,
    projectId,
    userId,
    editNote
    })

}))

module.exports = notesRouter;
