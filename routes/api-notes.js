const express = require("express");
const apiNoteRouter = express.Router();
const { requireAuth } = require("../auth");
const { Note, Task } = require("../db/models");
const { asyncHandler, deleteItem } = require("./utils");


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
    console.log(allNotes, "All notes here-----------");
    res.json(allNotes)
  })
)

module.exports = apiNoteRouter;
