function projectFieldInnerHtml(projects) {
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
      <form id="${projectId}">
        <button class="delete__button" type="submit">Delete</button>
      </form>
    </div>
  </div>
</div>
`;
		projectsTilesContainer.appendChild(projectHolderDiv);
	});
}

export default projectFieldInnerHtml;
