import { taskFieldInnerHtml, urlIdIdentifier, emptyTaskCreate } from "./api-utils.js";

window.addEventListener("DOMContentLoaded", async () => {
	// Listener to delete tasks
	const taskTilesContainer = document.querySelector(".tasksContainer");
	taskTilesContainer.addEventListener("submit", async (event) => {
		event.preventDefault();

		const taskEventId = event.target.id; // this is event Target Delete id
		const urlId = urlIdIdentifier(window.location.href); // this is used to find out Current Task Id window is on in back end

		try {
			const response = await fetch("/api-tasks/", {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ taskEventId, urlId }),
			});

			const tasks = await response.json();
			if (tasks[1] == taskEventId) window.location.href = `/projects/${tasks[2]}`;
			taskTilesContainer.innerHTML = "";
			if (tasks[0].length) taskFieldInnerHtml(tasks[0]);
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
			if (tasks[1].length > 1) emptyTaskCreate(tasks[1]);
			if (tasks[0].length) taskFieldInnerHtml(tasks[0]);
			else return;
		} catch (err) {
			console.error("messed up in task creation TASKSAPI.js", err);
		}
	});

	// to edit a form
	const taskEditForm = document.querySelector(".taskEdit__form");
	taskEditForm.addEventListener("submit", async (event) => {
		event.preventDefault();
		event.stopImmediatePropagation();

		const formData = new FormData(taskEditForm);
		const priority = formData.get("priority");
		const inProgress = formData.get("inProgress");
		const completed = formData.get("completed");
		// inProgress and completed will be null if unchecked, on if checked
		const name = formData.get("name");
	});

	const taskInProgressCheck = document.querySelector("#taskEdit__inProgress");
	taskInProgressCheck.addEventListener("click", async (event) => {
		// event.preventDefault();
		event.stopImmediatePropagation();

		const taskId = urlIdIdentifier(window.location.href)[0];
		const formData = new FormData(taskEditForm);
		const inProgress = formData.get("inProgress");
		// inProgress and completed will be null if unchecked, on if checked
		// console.log(inProgress, "==============IN PROGRESS");
		try {
			const res = await fetch("/api-tasks", {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ taskId, inProgress }),
			});
			const tasks = await res.json();
			console.log(tasks, "TASKS ON 89=======================");
			taskTilesContainer.innerHTML = "";
			taskCreateInput.value = "";
			if (tasks[1].length > 1) emptyTaskCreate(tasks[1]);
			if (tasks[0].length) taskFieldInnerHtml(tasks[0]);
			else return;
		} catch (err) {
			console.error("messed up in task creation TASKSAPI.js", err);
		}
	});
});
