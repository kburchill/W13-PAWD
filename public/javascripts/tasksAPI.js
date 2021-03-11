import { taskFieldInnerHtml, urlIdIdentifier } from "./api-utils.js";

window.addEventListener("DOMContentLoaded", async () => {
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
			taskTilesContainer.innerHTML = "";

			if (tasks.length) taskFieldInnerHtml(tasks);
			else return;
		} catch (err) {
			console.error("We messed up the tasks api. sorry, jim", err);
		}
	});
});
