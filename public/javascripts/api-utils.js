export function projectFieldInnerHtml(projects) {
	const projectsTilesContainer = document.querySelector(".projectsTilesContainer");
	projects.forEach((project) => {
		const projectHolderDiv = document.createElement("div");
		projectHolderDiv.innerHTML = `<div class="projectField">
  <input class="unchecked" type="checkbox" />
  <div class="projectHolder">
    <a href="projects/${project.id}">${project.name}</a>
    <div class="progressBorder">
      <div class="progressFiller">${project.progress} % </div>
    </div>
    <div>
      <form id="${project.id}">
        <button class="delete__button" type="submit">Delete</button>
      </form>
    </div>
  </div>
</div>
`;
		projectsTilesContainer.appendChild(projectHolderDiv);
	});
}

//    FOR NOTES.
export function noteFieldInnerHtml(notes, taskId) {
	const notesContainer = document.querySelector(".notesTilesContainer"); //this needs to be made

	notes.forEach((note) => {
		const noteHolderDiv = document.createElement("div");
		noteHolderDiv.innerHTML = `<div class="noteField">
    <div class="noteHolder">
	   <p>${note.content}</p>
	   <div>
		<form id="${note.id}">
			<button class="delete__button" type="submit">Delete</button>
		</form>
		<form action="/tasks/${taskId}" method="post">
			<button type="submit" name="noteId" value="${note.id}">Edit</button>
		</form>
	</div>
</div>
  `;

		notesContainer.appendChild(noteHolderDiv);
	});
}

export function taskFieldInnerHtml(tasks) {
	const tasksContainer = document.querySelector(".tasksContainer");

	tasks.forEach((task) => {
		const taskHolderDiv = document.createElement("div");
		taskHolderDiv.innerHTML = `<div class="taskField"><input class="unchecked" type="checkbox">
    <div class="taskHolder"><a href="/tasks/${task.id}">${task.name}</a>
      <div class="taskHolder__inProgress">${task.inProgress}</div>
      <div class="taskHolder__completed">${task.completed}</div>
      <div class="taskHolder__priority">${task.priority}</div>
      <div>
        <form id="${task.id}">
          <button class="delete__button" type="submit">Delete</button>
        </form>
      </div>
    </div>
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

export default { projectFieldInnerHtml, noteFieldInnerHtml, taskFieldInnerHtml, urlIdIdentifier };
