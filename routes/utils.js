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

	// const userId = req.session.userAuth.userId
	return userId;
};

async function findCurrentProjectId(urlId) {
	if (urlId[1] === "task" && urlId[0]) {
		const task = await Task.findByPk(urlId[0]);
		return task.projectId;
	} else return urlId[0];
}

const grabAll = async (taskId, session, editNote) => {
	const note = await Note.build();
	const project = await Project.build();
	const task = await Task.findByPk(taskId);
	const userId = findCurrentUser(session);
	const { projectId } = task;
	const notes = await Note.findAll({ where: { taskId } });
	const tasks = await Task.findAll({ where: { projectId } });
	const allProjects = await Project.findAll({
		where: { projectOwnerId: userId },
		order: [['id', 'ASC']]
	});
	const {
		dataValues: { name },
	} = await Project.findByPk(projectId);

	return {
		note,
		notes,
		title: "notes",
		taskId,
		tasks,
		projects,
		project,
		projectId,
		userId,
		editNote,
		task,
		name,
	};
};

async function checkProgress(projectId) {
	const project = await Project.findByPk(projectId);
	const totalTasks = await Task.findAll({ where: { projectId: project.dataValues.id } });
	const completedTasks = await Task.findAll({ where: { projectId: project.id, completed: true } });
	const percentCompleted = completedTasks.length / totalTasks.length;
	return Math.round(percentCompleted * 100);
}

async function updateProgress(currentProjectId) {
	let currProject = await Project.findByPk(currentProjectId);
	let percentCompleted = await checkProgress(currentProjectId);
	await currProject.update({ progress: percentCompleted });
}

module.exports = {
	updateProgress,
	asyncHandler,
	csrfProtection,
	deleteItem,
	findCurrentUser,
	findCurrentProjectId,
	grabAll,
	checkProgress,
};
