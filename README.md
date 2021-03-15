- Our wiki docs: https://github.com/guny12/W13-TaskMain/wiki

# Projects All the Way Down

Projects All the Way Down (or PAWD for short) is an application designed to be used by teams starting projects in need of a fast and easy way to organize while keeping track of many moving pieces. Users are able to create an account and from there, create their project. Inside their project, tasks can be made and commented on. This simple yet effective approach helps streamline what can be an arduous and overwhelming process. The PAWD team hopes you enjoy your visit!

## Installation and use

- git clone `https://github.com/guny12/W13-TaskMain`
- Run `npx dotenv sequelize db:create`
- Then `npx dotenv sequelize db:migrate`
- Then finally `npx dotenv sequelize db:seed:all`

## Technologies Used

- Express
- Sequelize
- Pug
- CSS
- Javascript

## Features

- User Creation
- User Login
- Demo User
- Search
- Find All Projects
- Project Creation
- Task Creation
- Task Update
- Note/Comment Creation
- Comment Edit & Delete

## Problems faced

Initially, setting up AJAX for our features was a difficult task. The number of interactions in our front-end and back-end proved to be quite cumbersome to grasp at first but through sound logic and reasoning (and many hours of code work/review), our team was able to lay an effective foundation and and approach for future API routes via helper functions and effective and clear templates. As we made progress, use of helper function in our utils file streamlined the process of creating more AJAX processes and API routes.


## Code Snippet from front-end/back-end note creation

```
apiTaskRouter.patch(
	"/",
	requireAuth,
	taskValidators,
	asyncHandler(async (req, res) => {
		// console.log(req.body, "REQ.BOD==============================");
		const { taskId, inProgress, completed, priority, name } = req.body;
		const currentUser = findCurrentUser(req.session);
		const mappedErrors = validationResult(req).errors;
		const errors = mappedErrors.map((error) => error.msg);
		const task = await Task.findByPk(taskId);
		const projectId = task.projectId;
		let error = "";
		try {
			// console.log("THIS HAPPENED===============================");
			if (name && name.length >= 1 && name.length < 101) await task.update({ name });
			if (inProgress === null) await task.update({ inProgress: false });
			else if (inProgress === "on") await task.update({ inProgress: true });
			if (completed === null) await task.update({ completed: false });
			else if (completed === "on") await task.update({ completed: true });
			await updateProgress(projectId);
			if (priority) await task.update({ priority });
			else {
				if (errors.length > 0) error = errors[0];
			}
		} catch (err) {
			console.error(err);
		}
		const allProjects = await Project.findAll({ where: { projectOwnerId: currentUser } });
		const tasks = await Task.findAll({ where: { projectId } });
		res.json([tasks, error, allProjects]);
	})
);
```

## Acknowledgements

-The hardwork and dedication of the PAWD team that gave this project life
