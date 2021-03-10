const express = require("express");
const apiNoteRouter = express.Router();
const { requireAuth } = require("../auth");
const { Note, Task } = require("../db/models");
const { asyncHandler, deleteItem } = require("./utils");


apiNoteRouter.delete(
  "/:id",
  requireAuth,
  asyncHandler(async (req, res) => {
    const note = req.body
    console.log("This is all we get:", req.params.id);
    try {
      await deleteItem(note.noteId, Note);
    } catch (error) {

    }
    const allNotes = await Note.findAll({ where: { taskId: req.params.id } });
    res.json(allNotes)
  })
)

module.exports = apiNoteRouter;
