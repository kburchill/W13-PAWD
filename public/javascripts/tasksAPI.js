import { taskFieldInnerHtml } from "./api-utils.js";

window.addEventListener("DOMContentLoaded", async () => {
  const taskTilesContainer = document.querySelector(".tasksContainer")

  taskTilesContainer.addEventListener("submit", async (event) => {
    event.preventDefault()

    const taskId = event.target.id

    try {
      const response = await fetch("/api-tasks/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskId }),
      });

      const tasks = await response.json();
      taskTilesContainer.innerHTML = "";

      if (tasks.length) taskFieldInnerHtml(tasks);
      else return;
    } catch (err) {
      console.error("We messed up the tasks api. sorry, jim", err)
    }
  })
})
