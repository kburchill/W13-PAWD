- Our wiki docs: https://github.com/guny12/W13-TaskMain/wiki

# Projects All the Way Down

Projects All the Way Down (or PAWD for short) is an application designed to be used by teams starting projects in need of a fast and easy way to organize while keeping track of many moving pieces. Users are able to create an account and from there, create their project. Inside their project, tasks can be made and commented on. This simple yet effective approach helps streamline what can be an arduous and overwhelming process. The PAWD team hopes you enjoy your visit!

## Installation and use

- git clone `https://github.com/guny12/W13-TaskMain`
- Run `npx sequelize db:create`, then `npx sequelize db:migrate`, and finally `npx sequelize db:seed:all`

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

Initially, setting up AJAX for our features was a difficult task. The number of interactions in our front-end and back-end proved to be quite cumbersome to grasp at first but through sound logic and reasoning (and many hours of code work/review), our team was able to lay an effective foundation for future API routes via helper functions and effective and clear templates. As we made progress, use of helper function in our utils file streamlined the process of creating more AJAX processes and API routes.


## Code Snippet from front-end/back-end note creation

```
	const noteCreateForm = document.querySelector(".noteList__form");
	const noteTextarea = document.querySelector(".note-content");
	noteCreateForm.addEventListener("submit", async (event) => {
		event.preventDefault();

		const formData = new FormData(noteCreateForm);
		const content = formData.get("content");
		const [userId, taskId] = noteCreateForm.id.split(":");

		try {
			const res = await fetch("/api-notes", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ content, userId, taskId }),
			});
			const notes = await res.json();

			notesContainer.innerHTML = "";
			noteTextarea.value = "";
			if (notes[1].length) emptyNoteCreate(notes[1]);
			if (notes[0].length) noteFieldInnerHtml(notes[0], taskId);
			else return;
		} catch (err) {
			console.error("messed up in notes create", err);
		}
	});
```


```
apiNoteRouter.post(
	"/",
	requireAuth,
	notesValidators,
	asyncHandler(async (req, res) => {
		const { content, userId, taskId } = req.body;
		const mappedErrors = validationResult(req).errors;
		const errors = mappedErrors.map((error) => error.msg);
		try {
			if (mappedErrors.length === 0) {
				await Note.create({ content, userId, taskId });
			}
		} catch (err) {
			console.err("messed up on backend note create", err);
		}
		const notes = await Note.findAll({ where: { taskId } });
		res.json([notes, errors]);
	})
);
```

## Acknowledgements

-The hardwork and dedication of the PAWD team that gave this project life
