#!/usr/bin/python3

html_content = """
<!DOCTYPE html>
<html>
<head>
    <title>3er Block</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link rel="stylesheet" href="../css/styles.css"> <!-- Reference to your external CSS file -->
    <script src="../js/utils.js"></script>
    <script src="../js/tasks.js"></script>
    <script src="../js/static_data.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <link rel="icon" type="image/png" href="../public/lmu.png">
</head>
<body class='bg-gray-50'>

<header class="box w-full py-3 px-12 flex flex-row justify-between items-center rounded-lg" >
    <div class="w-1/3 flex flex-row items-center justify-start">
         <h1 class="text-2xl font-semibold txt">Gruppe 3</h1>
    </div>
    <nav class="navbar w-1/3">
        <ul class="w-full flex flex-row justify-center items-center gap-8">
            <li><a href="http://bioclient1.bio.ifi.lmu.de/~hummelj/cgi-bin/home.py" id="teamLink">Home</a></li>
            <li><a href="http://bioclient1.bio.ifi.lmu.de/~hummelj/cgi-bin/tasks.py" id="tasksLink">Werkbank</a></li>
        </ul>
    </nav>
    <div class="w-1/3 flex flex-row items-center justify-end">
        <button id="dark-mode-toggle" class="inline-block ">
            <i class="fas fa-moon"></i>
        </button>
    </div>

</header>
<div class="w-full flex flex-col items-start justify-start gap-4 mt-4">
    <div id="tasksContainer" class="w-full flex flex-col items-center justify-start gap-4">
    </div>
</div>

<script>

    // Call the openTasks function after the DOM is loaded
    document.addEventListener("DOMContentLoaded", function() {
        openTasks([1]);
    });
</script>

</body>
</html>
"""

print("Content-type: text/html\n\n")
print(html_content)