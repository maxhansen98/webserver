function toggleDarkMode() {
    var body = document.body;
    body.classList.toggle("dark-mode");
}

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    toggleDarkMode(); 
}

document.getElementById("dark-mode-toggle").addEventListener("click", function() {
    toggleDarkMode();
});