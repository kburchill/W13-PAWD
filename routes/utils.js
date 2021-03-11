const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);
const csrf = require("csurf");
const csrfProtection = csrf({ cookie: true });
const { Task } = require("../db/models");

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

module.exports = { asyncHandler, csrfProtection, deleteItem, findCurrentUser, findCurrentProjectId };
