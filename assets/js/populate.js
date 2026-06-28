function loadOverview() {

    const overviewProjects =
        document.getElementById("overviewProjects");

    const overviewCertifications =
        document.getElementById("overviewCertifications");

    const overviewTechnologies =
        document.getElementById("overviewTechnologies");

    const overviewInProgress =
        document.getElementById("overviewInProgress");

    if (
        !overviewProjects ||
        !overviewCertifications ||
        !overviewTechnologies ||
        !overviewInProgress
    ) return;

    // Total Projects
    overviewProjects.textContent =
        data.projects.length;

    // Total Certifications
    overviewCertifications.textContent =
        data.certifications.length;

    // Unique Technologies
    const technologies = new Set();

    data.projects.forEach(project => {

        project.techStacks.forEach(tech => {
            technologies.add(tech);
        });

    });

    overviewTechnologies.textContent = technologies.size;

    // Ongoing Projects
    const inProgress =
        data.projects.filter(project =>
            project.status === "In Progress"
        ).length;

    overviewInProgress.textContent = inProgress;
}

function loadOngoingProjects() {

    const container = document.getElementById("ongoingProjects");

    if (!container) return;

    const ongoingProjects =
        data.projects.filter(project => project.status === "In Progress");

    let html = "";

    ongoingProjects.forEach(project => {

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
                    <div class="projectStatus">
                        ${project.status}
                    </div>
                    <img src="assets/images/${project.image}" class="projectBannerImage" alt="${project.title}">
                </div>
                <div class="projectDetails">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="projectTechStacks">
                        ${techStacks}
                    </div>
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

    container.innerHTML = html;
}

function loadProjectCategories() {

    const projectCategories = document.getElementById("projectCategories");

    if (!projectCategories) return;

    const categories = [
        "All",
        ...new Set(data.projects.map(project => project.category))
    ];

    projectCategories.innerHTML = categories.map((category, index) => `
        <button
            class="categoryButton ${index === 0 ? "active" : ""}"
            data-category="${category}">
            ${category}
        </button>
    `).join("");
}

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

function loadTechBreakdown() {

    const container = document.getElementById("techBreakdownList");

    if (!container) return;

    const totalProjects = data.projects.length;

    const techGroups = {
        "HTML / CSS": ["HTML", "CSS"],
        "JavaScript": ["JavaScript"],
        "Bootstrap": ["Bootstrap"],
        "React": ["React"],
        "Laravel / PHP": ["Laravel", "PHP"],
        "Node.js / Express": ["Node.js", "Express"],
        "MySQL": ["MySQL"],
        "Firebase": ["Firebase"],
        "Figma": ["Figma"]
    };

    let breakdown = [];

    Object.entries(techGroups).forEach(([groupName, technologies]) => {

        let count = 0;

        data.projects.forEach(project => {

            const hasTechnology = technologies.some(tech =>
                project.techStacks.includes(tech)
            );

            if (hasTechnology) {
                count++;
            }

        });

        if (count > 0) {

            breakdown.push({
                name: groupName,
                count: count,
                percentage: (count / totalProjects) * 100
            });

        }

    });

    breakdown.sort((a, b) => b.count - a.count);

    let html = "";

    breakdown.forEach(item => {

        const badgeClass = item.name
            .split("/")[0]
            .trim()
            .toLowerCase()
            .replace(/\s+/g, "");

        html += `
            <div class="techBreakdownItem">
                <div class="techBreakdownHeader">
                    <span class="projectTechBadge ${badgeClass}">
                        ${item.name}
                    </span>
                    <span class="techBreakdownValue">
                        ${item.count} Project${item.count > 1 ? "s" : ""}
                    </span>
                </div>
                <div class="progress">
                    <div
                        class="progress-bar"
                        style="width:${item.percentage}%"
                    ></div>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

function loadFeaturedProject() {

    const container = document.getElementById("featuredProject");

    if (!container) return;
    if (!data.projects) return;

    const featured =
        data.projects.find(project => project.featured) ||
        data.projects[0];

    if (!featured) return;

    container.innerHTML = `
        <div class="featuredProjectCard">
            <div class="projectBanner bannerOne">
                <div class="projectStatus">
                    Featured
                </div>
                <img src="assets/images/${featured.image}" class="projectBannerImage" alt="${featured.title}">
            </div>
            <div class="projectDetails">
                <h3>${featured.title}</h3>
                <p>${featured.description}</p>
                <a target="_blank" href="${featured.viewLink}" class="viewButton">
                    <i class="fa-solid fa-arrow-up-right-from-square"></i>
                    <span>View Live</span>
                </a>
            </div>
        </div>
    `;
}

function loadCertificationCategories() {

    const certificationCategories = document.getElementById("certificationCategories");

    if (!certificationCategories) return;

    const categories = [
        "All",
        ...new Set(data.certifications.map(certification => certification.category))
    ];

    certificationCategories.innerHTML = categories.map((category, index) => `
        <button
            class="categoryButton ${index === 0 ? "active" : ""}"
            data-category="${category}">
            ${category}
        </button>
    `).join("");
}

function loadCertifications() {

    const certificationContainer = document.getElementById("certificationContainer");

    if (!certificationContainer) return;
    if (!data.certifications) return;

    let html = "";

    data.certifications.forEach(certification => {

        html += `
            <div class="certificationCard">
                <div class="certificationIcon">
                    <i class="fa-solid fa-globe"></i>
                </div>
                <div class="certificationContent">
                    <h3>${certification.title}</h3>
                    <div class="certificationMeta">
                        <span>${certification.platform}</span>
                        <span>${certification.dateEarned}</span>
                    </div>
                    <div class="certificationBadges">
                        <span class="certificateId">
                            ${certification.certificateId}
                        </span>
                        <span class="verifiedBadge">
                            ${certification.status}
                        </span>
                        <span class="categoryBadge">
                            ${certification.category}
                        </span>
                    </div>
                </div>
            </div>
        `;
    });

    certificationContainer.innerHTML = html;
}

function loadQuickStats() {

    const projectCount = document.getElementById("projectCount");
    const certificationCount = document.getElementById("certificationCount");

    if (projectCount) {
        projectCount.textContent = data.projects.length;
    }

    if (certificationCount) {
        certificationCount.textContent = data.certifications.length;
    }
}

function loadProjectStats() {

    const total = data.projects.length;

    const completed = data.projects.filter(
        project => project.status === "Completed"
    ).length;

    const active = data.projects.filter(
        project => project.status === "In Progress"
    ).length;

    document.getElementById("totalProjects").textContent = total;
    document.getElementById("completedProjects").textContent = completed;
    document.getElementById("activeProjects").textContent = active;
}

function loadCertificationStats() {

    const total = data.certifications.length;

    const verified = data.certifications.filter(
        certification => certification.status === "Verified"
    ).length;

    const inProgress = data.certifications.filter(
        certification => certification.status === "In Progress"
    ).length;

    document.getElementById("totalCertifications").textContent = total;
    document.getElementById("verifiedCertifications").textContent = verified;
    document.getElementById("inProgressCertifications").textContent = inProgress;
}

function loadLatestCertification() {

    const container = document.getElementById("latestCertification");

    if (!container) return;
    if (!data.certifications) return;

    const latest =
        data.certifications.find(cert =>
            cert.status === "In Progress"
        ) || data.certifications[0];

    if (!latest) return;

    container.innerHTML = `
        <div class="latestCertificationCard">
            <div class="latestCertificationIcon">
                <i class="fa-solid fa-book-open"></i>
            </div>
            <div class="latestCertificationInfo">
                <h3>${latest.title}</h3>
                <span>
                    ${latest.platform} • ${latest.dateEarned}
                </span>
                <div class="latestCertificationStatus">
                    ${latest.status}
                </div>
            </div>
        </div>
    `;
}

function loadPlatforms() {

    const platformList = document.getElementById("platformList");

    if (!platformList) return;
    if (!data.certifications) return;

    const platforms = {};

    data.certifications.forEach(certification => {

        const platform = certification.platform;

        platforms[platform] = (platforms[platform] || 0) + 1;

    });

    let html = "";

    Object.entries(platforms)
        .sort((a, b) => b[1] - a[1])
        .forEach(([platform, count]) => {

            const platformClass = platform
                .toLowerCase()
                .replace(/\s+/g, "")
                .replace(/[().]/g, "");

            html += `
                <div class="platformItem">
                    <span class="platformName ${platformClass}">
                        ${platform}
                    </span>
                    <span class="platformCount">
                        ${count} ${count > 1 ? "certs" : "cert"}
                    </span>
                </div>
            `;

        });

    platformList.innerHTML = html;
}