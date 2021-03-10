const express = require("express");
const apiNoteRouter = express.Router();
const { requireAuth } = require("../auth");
const { Note, Task } = require("../db/models");
const { asyncHandler, deleteItem } = require("./utils");


apiNoteRouter.delete(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const noteId = req.body.id

    try {
      await deleteItem(noteId, Note);
    } catch (error) {

    }
    const allNotes = await Note.findAll({ where: { taskId: req.body.taskId } });
    res.json(allNotes)
  })
)
