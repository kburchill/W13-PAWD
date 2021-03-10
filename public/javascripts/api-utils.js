export function projectFieldInnerHtml(projects) {
  const projectsTilesContainer = document.querySelector(".projectsTilesContainer");
  projects.forEach((project) => {
    const projectHolderDiv = document.createElement("div");
    projectHolderDiv.innerHTML = `<div class="projectField">
  <input class="unchecked" type="checkbox" />
  <div class="projectHolder">
    <p>${project.name}</p>
    <div class="progressBorder">
      <div class="progressFiller">${project.progress}</div>
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
export function noteFieldInnerHtml(notes) {
  const notesContainer = document.querySelector(".notesTilesContainer");

  notes.ForEach((note) => {
    const noteHolderDiv = document.createElement("div");
    noteHolderDiv.innerHTML = `<div class="noteField">
    <div class="noteHolder">
      <p>${note.content}</p>
      <div>
        <form id="${note.id}">
          <button class="delete__button" type="submit">Delete</button>
          <button class="note-edit-button" type="submit">Edit</button>
        </form>
      </div>
    </div>
  </div>
  `;

    notesContainer.appendChild(noteHolderDiv)
  })
}

export default { projectFieldInnerHtml, noteFieldInnerHtml };
