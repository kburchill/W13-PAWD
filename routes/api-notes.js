const express = require("express");
const apiNoteRouter = express.Router();
const { requireAuth } = require("../auth");
const { Note, Task } = require("../db/models");
const { asyncHandler, deleteItem, findCurrentUser } = require("./utils");


apiNoteRouter.delete(
  "/:id",
  requireAuth,
  asyncHandler(async (req, res) => {
    console.log(req.params, "--------------");
    const { noteId } = req.body
    const note = await Note.findByPk(noteId);
    console.log(note);
    try {
      await deleteItem(noteId, Note);
    } catch (error) {

    }
    const allNotes = await Note.findAll({ where: { taskId: note.taskId } });
    res.json(allNotes)
  })
)

apiNoteRouter.post("/", requireAuth, asyncHandler(async (req, res) => {
  const { content, userId, taskId } = req.body;

  try{
    await Note.create({ content, userId, taskId });
  } catch (err) {
    console.err("messed up on backend note create", err);
  }
  const notes = await Note.findAll({ where: { taskId } });
  res.json(notes)
}))


apiNoteRouter.patch("/:id", requireAuth, asyncHandler(async (req, res) => {
  const { content, taskId } = req.body;
  const userId =

  try{
    await Note.create({ content, userId, taskId });
  } catch (err) {
    console.err("messed up on backend note create", err);
  }
  const notes = await Note.findAll({ where: { taskId } });
  res.json(notes)
}))


module.exports = apiNoteRouter;
