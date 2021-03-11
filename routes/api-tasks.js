const express = require("express");
const apiTaskRouter = express.Router();
const { requireAuth } = require("../auth");
const { Task } = require("../db/models");
const { asyncHandler, deleteItem } = require("./utils");

apiTaskRouter.delete(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { taskId } = req.body
    const task = await Task.findByPk(taskId)

    try {
      await deleteItem(taskId, Task);
    } catch (error) {
      console.log(error)
    }

    const allTasks = await Task.findAll({ where: { projectId: task.projectId } })
    res.json(allTasks)
  })
)



module.exports = apiTaskRouter
