// Chatbot Toggle Functionality

var chatbot = document.getElementById("chatbot");

document.getElementById("chatbotButton").addEventListener("click", function () {
    chatbot.classList.remove("d-none");
});

document.getElementById("chatbotClose").addEventListener("click", function () {
    chatbot.classList.add("d-none");
});