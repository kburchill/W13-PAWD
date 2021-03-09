const { Project } = require("../db/models");
const { Auth } = require("./auth");
const { asyncHandler, csrfProtection } = require("./utils");
const express = require("express");
const projectsRouter = express.Router();

// const { userValidators } = require("./validators");

projectsRouter.get(
  "/",
  csrfProtection,
  asyncHandler(async (req, res) => {
    const project = await Project.build()

    res.render("project", {
      title: "Projects",
      project,
      csrfToken: req.csrfToken()
    })
  })
)

projectsRouter.post(
  "/",
  csrfProtection,
  // projectValidators,
  asyncHandler(async (req, res) => {
    const { name } = req.body
    const project = Project.create({ name, progress: 0, projectOwnerId:  });
  })
)

module.exports = projectsRouter;
