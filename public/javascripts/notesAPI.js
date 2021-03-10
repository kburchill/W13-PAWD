import { noteFieldInnerHtml } from "./api-utils.js";

window.addEventListener("DOMContentLoaded", async () => {
  const notesContainer = document.querySelector(".notesTilesContainer");
  // console.log(notesContainer);
  notesContainer.addEventListener("submit", async (event) => {
    // console.log("we are hearing the submit");
    event.preventDefault();
    const noteId = event.target.id;
    // console.log(event.target);
    try {
      const res = await fetch(`/api-notes/${noteId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ noteId }),
      });
      const notes = await res.json();
      notesContainer.innerHTML = "";

      if (notes.length) noteFieldInnerHtml(notes);
      else return
    } catch (err) {
      console.error("There was an error in your notes API file", err)
    }
  })
})
