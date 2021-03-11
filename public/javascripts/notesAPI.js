import { noteFieldInnerHtml } from "./api-utils.js";

window.addEventListener("DOMContentLoaded", async () => {

  //Listener for deleteing notes
  const notesContainer = document.querySelector(".notesTilesContainer");
  notesContainer.addEventListener("submit", async (event) => {

    event.preventDefault();
    const noteId = event.target.id;

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

  //Listener for creating a note
  const noteCreateForm = document.querySelector(".noteList__form");
  const noteTextarea = document.querySelector(".note-content");
  noteCreateForm.addEventListener("submit", async (event) => {

    event.preventDefault()

    const formData = new FormData(noteCreateForm);
    const content = formData.get("content");
    const [ userId, taskId ] = noteCreateForm.id.split(':');

    try {
      const res = fetch("/api-notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, userId, taskId })
      })
      const notes = await res.json();

      notesContainer.innerHTML = "";
      noteTextarea.value = "";

      if (notes.length) noteFieldInnerHtml(notes);
      else return;
    } catch(err) {
      console.error("messed up in notes create", err);
    }
  })
})
