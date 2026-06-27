function clearActiveNavButtons() {

    const navLinks = document.getElementsByClassName('nav-link');

    Array.from(navLinks).forEach(link => {
        link.classList.remove('active');
    });
}

function setActiveNavButton(buttonName) {

    const navButtons = document.getElementsByClassName(buttonName);

    Array.from(navButtons).forEach(button => {
        button.classList.add('active');
    });
}

function loadPage(content = 'home', buttonName = 'homeButton') {

    localStorage.setItem('currentPage', content);
    localStorage.setItem('currentButton', buttonName);

    clearActiveNavButtons();
    setActiveNavButton(buttonName);

    const contents = document.getElementById('contents');

    fetch(`content/${content}.html`)
        .then(response => response.text())
        .then(data => {
            contents.innerHTML = data;

            if(content === "projects") {
                loadProjects();
            }

            if (content === "certifications") {
                loadCertifications();
            }
        })
        .catch(error => console.error('Error fetching file:', error));
}