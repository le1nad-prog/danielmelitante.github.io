function loadProjects() {

    const projectContainer = document.getElementById("projectContainer");

    if (!projectContainer) return;
    if (!data.projects) return;

    let html = "";

    data.projects.forEach(project => {
        const techStacks = project.techStacks
            .map(tech => {
                const techClass = tech
                    .toLowerCase()
                    .replace(/\s+/g, "");
                return `
                    <span class="techBadge ${techClass}">
                        ${tech}
                    </span>
                `;
            })
            .join("");

        html += `
            <div class="projectCard">
                <div class="projectBanner bannerOne">
                    <div class="projectStatus">${project.status}</div>
                    <i class="fa-regular fa-folder-open projectFolder"></i>
                </div>
                <div class="projectDetails">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="projectTechStacks">${techStacks}</div>
                    <div class="actionButtons">
                        <a target="_blank" href="${project.viewLink}" class="viewButton">
                            <i class="fa-solid fa-globe"></i>
                            <span>View</span>
                        </a>
                        <a target="_blank" href="${project.documentationLink}" class="documentationButton">
                            <i class="fa-brands fa-github"></i>
                            <span>Documentation</span>
                        </a>
                    </div>
                </div>
            </div>
        `;
    });

    projectContainer.innerHTML = html;
}