import projectFieldInnerHtml from "./api-utils.js";

window.addEventListener("DOMContentLoaded", async () => {
	const projectsTilesContainer = document.querySelector(".projectsTilesContainer");

	projectsTilesContainer.addEventListener("submit", async (event) => {
		console.log(event.target, "EVENT TARGET HERE");
		event.preventDefault();

		const projectId = event.target.id;
		console.log(projectId);
		try {
			const response = await fetch("/api-projects/", {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ projectId }),
			});
			const projects = await response.json();
			projectsTilesContainer.innerHTML = "";
			if (projects.length) projectFieldInnerHtml(projects);
			else return;
		} catch (err) {
			console.error("DONE GOOFED IN projectsAPI.js trycatch", err);
		}
	});
});

// html functions down here
