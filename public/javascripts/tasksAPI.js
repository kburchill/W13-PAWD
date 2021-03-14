import { taskFieldInnerHtml, urlIdIdentifier, emptyTaskCreate, projectFieldInnerHtml } from "./api-utils.js";

window.addEventListener("DOMContentLoaded", async () => {
	// Listener to delete tasks
	const projectsTilesContainer = document.querySelector(".projectsTilesContainer");
	const taskTilesContainer = document.querySelector(".tasksContainer");
	taskTilesContainer.addEventListener("submit", async (event) => {
		event.preventDefault();

		const taskEventId = event.target.id; // this is event Target Delete id
		const urlId = urlIdIdentifier(window.location.href); // this is used to find out Current Task Id window is on in back end

		try {
			const response = await fetch("/api-tasks", {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ taskEventId, urlId }),
			});

			const tasksAndProj = await response.json();
			if (tasksAndProj[1] == taskEventId) window.location.href = `/projects/${tasksAndProj[2]}`;
			taskTilesContainer.innerHTML = "";
			projectsTilesContainer.innerHTML = "";
			projectFieldInnerHtml(tasksAndProj[3]);
			if (tasksAndProj[0].length) taskFieldInnerHtml(tasksAndProj[0]);
			else return;
		} catch (err) {
			console.error("We messed up the tasks api. sorry, jim", err);
		}
	});

	//listener for creating a task
	const taskListForm = document.querySelector(".taskList__form");
	const taskCreateInput = document.getElementById("createNewTask");
	taskListForm.addEventListener("submit", async (event) => {
		event.preventDefault();

		const formData = new FormData(taskListForm);
		const name = formData.get("name");
		const priority = formData.get("priority");
		const projectId = taskListForm.id;

		try {
			const res = await fetch("/api-tasks", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name, priority, projectId }),
			});
			const tasks = await res.json();

			taskTilesContainer.innerHTML = "";
			taskCreateInput.value = "";
			if (tasks[1].length > 1) emptyTaskCreate(tasks[1], "#createNewTask");
			if (tasks[0].length) taskFieldInnerHtml(tasks[0]);
			else return;
		} catch (err) {
			console.error("messed up in task creation TASKSAPI.js", err);
		}
	});

	// to ajax edit task's name in EDIT FORM in taskEdit Form
	const taskEditForm = document.querySelector(".taskEdit__form");
	taskEditForm.addEventListener("submit", async (event) => {
		event.preventDefault();
		event.stopImmediatePropagation();

		const taskId = urlIdIdentifier(window.location.href)[0];
		const formData = new FormData(taskEditForm);
		const name = formData.get("name");
		try {
			const res = await fetch("/api-tasks", {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ taskId, name }),
			});
			const tasks = await res.json();
			taskTilesContainer.innerHTML = "";
			if (tasks[1].length > 1) {
				let taskEditErrorDiv = document.getElementById("taskEditErrorDiv");
				if (taskEditErrorDiv == null) {
					taskEditErrorDiv = document.createElement("div");
					taskEditErrorDiv.id = "taskEditErrorDiv";
				}
				taskEditErrorDiv.innerHTML = tasks[1];
				taskEditForm.appendChild(taskEditErrorDiv);
				emptyTaskCreate(tasks[1], ".taskEdit__name");
			}
			if (tasks[0].length) taskFieldInnerHtml(tasks[0]);
			else return;
		} catch (err) {
			console.error("messed up in task edit Name TASKSAPI.js", err);
		}
	});

	// to AJAX update inProgress or completed in taskEdit Form
	const taskInProgressCheck = document.querySelector("#taskEdit__inProgress");
	const taskCompletedCheck = document.querySelector("#taskEdit__completed");
	[taskCompletedCheck, taskInProgressCheck].forEach((checkbox) => {
		checkbox.addEventListener("click", async (event) => {
			event.stopImmediatePropagation();

			const taskId = urlIdIdentifier(window.location.href)[0];
			const formData = new FormData(taskEditForm);
			const inProgress = formData.get("inProgress");
			const completed = formData.get("completed");
			// inProgress and completed will be null -if unchecked, "on"- if checked

			try {
				const res = await fetch("/api-tasks", {
					method: "PATCH",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ taskId, inProgress, completed }),
				});
				const tasksAndProjs = await res.json();
				taskTilesContainer.innerHTML = "";
				projectsTilesContainer.innerHTML = "";
				projectFieldInnerHtml(tasksAndProjs[2]);
				if (tasksAndProjs[0].length) taskFieldInnerHtml(tasksAndProjs[0]);
				else return;
			} catch (err) {
				console.error("messed up in task edit checkboxes TASKSAPI.js", err);
			}
		});
	});

	// to ajax edit task's priority in EDIT FORM in taskEdit Form
	document.querySelector("#taskEdit__priority").addEventListener("change", async (event) => {
		event.stopImmediatePropagation();
		const formData = new FormData(taskEditForm);
		const priority = formData.get("priority");
		const taskId = urlIdIdentifier(window.location.href)[0];

		try {
			const res = await fetch("/api-tasks", {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ taskId, priority }),
			});
			const tasks = await res.json();
			taskTilesContainer.innerHTML = "";
			if (tasks[0].length) taskFieldInnerHtml(tasks[0]);
			else return;
		} catch (err) {
			console.error("messed up in task edit Priority TASKSAPI.js", err);
		}
	});

	document.querySelector(".task-edit-button").addEventListener("click", (event) => {
		event.stopImmediatePropagation();
		event.preventDefault();
		window.location.href = `/tasks/${urlIdIdentifier(window.location.href)[0]}`;
	});
});
