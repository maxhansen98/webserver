#!/usr/bin/python3

html_content = """
<!DOCTYPE html>
<html>
<head>
    <title>3er Block</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link rel="stylesheet" href="../css/styles.css"> <!-- Reference to your external CSS file -->
    <script src="../js/utils.js"></script> <!-- Reference to your external JavaScript file -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
</head>
<body class='bg-gray-50'>

<header class="box w-full py-3 px-12 flex flex-row justify-between items-center rounded-lg" >
    <button id="" class="inline-block">         
        <i class='fas fa-moon' style='color: #f2f2fb'></i>
    </button>
    <nav class="navbar">
        <ul class="w-full flex flex-row justify-center items-center gap-8">
            <li><a href="http://bioclient1.bio.ifi.lmu.de/~hummelj/cgi-bin/home.py" id="teamLink">Home</a></li>
            <li><a href="http://bioclient1.bio.ifi.lmu.de/~hummelj/cgi-bin/tasks.py" id="tasksLink">Aufgaben</a></li>
        </ul>
    </nav>
    <button id="dark-mode-toggle" class="inline-block ">
                <i class="fas fa-moon"></i>
    </button>

</header>
<div class="h-3"></div>
<div class="box w-full rounded-lg flex flex-col justify-start items-start">
    <div class="box w-full rounded-lg flex flex-col justify-start items-start">
        <h1 class='text-base font-bold text-gray-800'>Das Team:</h1>
    </div
</div>

</body>
</html>
"""

print("Content-type: text/html\n\n")
print(html_content)