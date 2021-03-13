import { noteFieldInnerHtml, urlIdIdentifier, emptyNoteCreate } from "./api-utils.js";

window.addEventListener("DOMContentLoaded", async () => {
	//Listener for deleteing notes
	const notesContainer = document.querySelector(".notesTilesContainer");
	notesContainer.addEventListener("submit", async (event) => {
		if (event.target.id) {
			event.preventDefault();
			const urlId = urlIdIdentifier(window.location.href);
			const taskId = urlId[0];
			const noteId = event.target.id;

			try {
				const res = await fetch(`/api-notes/${noteId}`, {
					method: "DELETE",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ noteId }),
				});
				const notes = await res.json();
				notesContainer.innerHTML = "";

				if (notes.length) noteFieldInnerHtml(notes, taskId);
				else return;
			} catch (err) {
				console.error("There was an error in your notes API file", err);
			}
		}
	});

	//Listener for creating a note
	const noteCreateForm = document.querySelector(".noteList__form");
	const noteTextarea = document.querySelector(".note-content");
	noteCreateForm.addEventListener("submit", async (event) => {
		event.preventDefault();

		const formData = new FormData(noteCreateForm);
		const content = formData.get("content");
		const [userId, taskId] = noteCreateForm.id.split(":");

		try {
			const res = await fetch("/api-notes", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ content, userId, taskId }),
			});
			const notes = await res.json();

			notesContainer.innerHTML = "";
			noteTextarea.value = "";
			if (notes[1].length) emptyNoteCreate(notes[1]);
			if (notes[0].length) noteFieldInnerHtml(notes[0], taskId);
			else return;
		} catch (err) {
			console.error("messed up in notes create", err);
		}
	});

	// listener for getting note edit form
	const editForm = document.querySelector(".noteList__edit");
	if (editForm) {
		editForm.addEventListener("submit", async (event) => {
			// event.preventDefault is seemingly stopping propigation of submit event.
			event.preventDefault();
			event.stopImmediatePropagation();

			const formData = new FormData(editForm);
			const content = formData.get("content");
			const ids = editForm.id.split(":");
			const [taskId, noteId] = ids;
			try {
				const response = await fetch(`/api-notes/${noteId}`, {
					method: "PATCH",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ content, taskId, noteId }),
				});

				const notes = await response.json();

				notesContainer.innerHTML = "";
				if (notes.length) noteFieldInnerHtml(notes, taskId);
				else return;
			} catch (err) {
				console.error("messed up in note edit", err);
			}
		});
	}
});
