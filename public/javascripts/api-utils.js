export function projectFieldInnerHtml(projects) {
	const projectsTilesContainer = document.querySelector(".projectsTilesContainer");
	projects.forEach((project) => {
		const projectProgressNum = project.progress == 100 ? "hundred" : "zero";
		const projectHolderDiv = document.createElement("div");
		// projectHolder.setAttribute("class", "taskField");
		projectHolderDiv.innerHTML = `<div class="projectField">
		<div class="projectHolder"></div><a href="/projects/${project.id}" name="${project.name}">${project.name}</a>
		<div class="progressBorder" name="0">
			<div class="progressFiller" style="width: ${project.progress}%"></div>
			<div class="${projectProgressNum}"><span>${project.progress}%</span></div>
		</div>
	<form id="${project.id}">
		<button class="delete__button" type="submit"><i class="far fa-trash-alt"></i></button>
			</form>
	</div>
`;
		projectsTilesContainer.appendChild(projectHolderDiv);
	});
}

//    FOR NOTES.
// export function noteFieldInnerHtml(notes, taskId) {
// 	const notesContainer = document.querySelector(".notesTilesContainer"); //this needs to be made

// 	notes.forEach((note) => {
// 		const noteHolderDiv = document.createElement("div");
// 		noteHolderDiv.innerHTML = `<div class="noteField">
//     <div class="noteHolder">
// 	   <p>${note.content}</p>
// 	   <div>
// 			<form id="${note.id}">
// 				<button class="delete__button" type="submit"><i class="far fa-trash-alt"></i></button>
// 			</form>
// 		<form action="/tasks/${taskId}" method="post">
// 			<button type="submit" name="noteId" value="${note.id}">Edit</button>
// 		</form>
// 	</div>
// </div>
//   `;

// 		notesContainer.appendChild(noteHolderDiv);
// 	});
// }

export function noteFieldInnerHtml(notes, taskId) {
	const notesContainer = document.querySelector(".notesTilesContainer"); //this needs to be made

	notes.forEach((note) => {
		const noteHolderDiv = document.createElement("div");
		noteHolderDiv.setAttribute("class", "noteHolder");
		noteHolderDiv.innerHTML = `
	   <p>${note.content}</p>
			<form id="${note.id}">
				<button class="delete__button" type="submit"><i class="far fa-trash-alt"></i></button>
			</form>
		<form action="/tasks/${taskId}" method="post">
			<button type="submit" name="noteId" value="${note.id}">Edit<i class="fas fa-edit" aria-hidden="true"></i></button>
		</form>
  `;
		notesContainer.appendChild(noteHolderDiv);
	});
}

export function taskFieldInnerHtml(tasks) {
	const tasksContainer = document.querySelector(".tasksContainer");

	tasks.forEach((task) => {
		const taskHolderDiv = document.createElement("div");
		taskHolderDiv.setAttribute("class", "taskField");
		taskHolderDiv.innerHTML = `
		<div class="taskHolder"><input class="unchecked taskCheckbox" type="checkbox">
		<div class="taskHolder__inProgress ${task.inProgress}InProgress ${task.completed}Completed"></div>
		<a href="/tasks/${task.id}">${task.name}</a>
			<div class="taskHolder__completed"></div>
			<div class="taskHolder__priority${task.priority}">${task.priority}</div>
				<form id="${task.id}">
					<button class="delete__button" type="submit"><i class="far fa-trash-alt"></i></button>
				</form>
		</div>
  `;

		tasksContainer.appendChild(taskHolderDiv);
	});
}

export function urlIdIdentifier(window) {
	const projectUrlId = window.split("/projects/")[1];
	const taskId = window.split("/tasks/")[1];
	const urlId = projectUrlId ? [projectUrlId, "project"] : [taskId, "task"];
	return urlId;
}

export function emptyTaskCreate(error, targetElement) {
	// const TaskListForm = document.querySelector(".taskList__form");
	// const div = document.createElement("div");
	// div.innerHTML = error;
	// TaskListDiv.appendChild(div);
	// const taskListInput = document.getElementById("createNewTask");
	const taskListInput = document.querySelector(targetElement);
	taskListInput.placeholder = error;
	return;
}

export function emptyNoteCreate(error) {
	const noteInput = document.querySelector(".note-content");
	noteInput.placeholder = error;
	return;
}

export default {
	emptyNoteCreate,
	emptyTaskCreate,
	projectFieldInnerHtml,
	noteFieldInnerHtml,
	taskFieldInnerHtml,
	urlIdIdentifier,
};
