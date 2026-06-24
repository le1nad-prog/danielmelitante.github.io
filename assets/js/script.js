// Chatbot Toggle Functionality

var chatbot = document.getElementById("chatbot");

document.getElementById("chatbotButton").addEventListener("click", function () {
    chatbot.classList.remove("d-none");
});

document.getElementById("chatbotClose").addEventListener("click", function () {
    chatbot.classList.add("d-none");
});

// Theme Functionality

function applyTheme(theme) {

    document.body.classList.toggle(
        "lightMode",
        theme === "light"
    );

    localStorage.setItem("theme", theme);

    const isDark = theme === "dark";

    document.getElementById("darkModeToggle").checked = isDark;

    const mobileToggle =
        document.getElementById("mobileDarkModeToggle");

    if (mobileToggle) {
        mobileToggle.checked = isDark;
    }
}

const savedTheme = localStorage.getItem("theme") || "dark";

applyTheme(savedTheme);

document
    .getElementById("darkModeToggle")
    .addEventListener("change", function () {

    applyTheme(
        this.checked ? "dark" : "light"
    );

});

document
    .getElementById("mobileDarkModeToggle")
    .addEventListener("change", function () {

    applyTheme(
        this.checked ? "dark" : "light"
    );

});