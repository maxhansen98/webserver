function toggleDarkMode() {
    var body = document.body;
    var isDarkMode = body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", isDarkMode ? "on" : "off");
}

function setInitialTheme() {
    var darkMode = localStorage.getItem("darkMode");
    if (darkMode === "on") {
        toggleDarkMode();
    }
}

document.addEventListener("DOMContentLoaded", function() {
    setInitialTheme();
    var darkModeToggle = document.getElementById("dark-mode-toggle");
    if (darkModeToggle) {
        darkModeToggle.addEventListener("click", function() {
            toggleDarkMode();
        });
    }
});
