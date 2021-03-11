import { projectFieldInnerHtml } from "./api-utils.js";

window.addEventListener("DOMContentLoaded", async () => {
	const projectsTilesContainer = document.querySelector(".projectsTilesContainer");

	projectsTilesContainer.addEventListener("submit", async (event) => {
		event.preventDefault();
		const eventProjectId = event.target.id;
		const projectUrlId = window.location.href.split("/projects/")[1];
		const taskId = window.location.href.split("/tasks/")[1];
		const urlId = projectUrlId ? [projectUrlId, "project"] : [taskId, "task"];
		try {
			const response = await fetch("/api-projects/", {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ eventProjectId, urlId }),
			});
			const projects = await response.json();
			if (projects[1] == eventProjectId) window.location.href = "/projects";
			projectsTilesContainer.innerHTML = "";
			if (projects.length) projectFieldInnerHtml(projects[0]);
			else return;
		} catch (err) {
			console.error("DONE GOOFED IN projectsAPI.js trycatch", err);
		}
	});
});

// html functions down here
