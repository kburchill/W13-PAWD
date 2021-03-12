const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);
const csrf = require("csurf");
const csrfProtection = csrf({ cookie: true });
const { Note, Task, Project } = require("../db/models");

//project delete
const deleteItem = async (itemId, model) => {
	const item = await model.findByPk(itemId);
	await item.destroy();
};

// QUERY FUNCTIONS
const findCurrentUser = (session) => {
	const {
		userAuth: { userId },
	} = session;
	return userId;
};

async function findCurrentProjectId(urlId) {
	if (urlId[1] === "task" && urlId[0]) {
		const task = await Task.findByPk(urlId[0]);
		return task.projectId;
	} else return urlId[0];
}

const grabAll = async (taskId, session, editNote) => {
	const note = await Note.build()
	const project = await Project.build();
	const task = await Task.findByPk(taskId)
	const userId = findCurrentUser(session);
	const { projectId } = task
	const notes = await Note.findAll({ where: { taskId } })
	const tasks = await Task.findAll({ where: { projectId } });
	const projects = await Project.findAll({ where: { projectOwnerId: userId } });

	return {
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
	  }
  }

module.exports = {
	asyncHandler,
	csrfProtection,
	deleteItem,
	findCurrentUser,
	findCurrentProjectId,
	grabAll };
