#!/usr/bin/python3

html_content = """
<!DOCTYPE html>
<html>
<head>
    <title>3er Block</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link rel="stylesheet" href="../css/styles.css"> <!-- Reference to your external CSS file -->
    <script src="../js/utils.js"></script>
    <script src="../js/static_data.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
</head>
<body class='bg-gray-50'>

<header class="box w-full py-3 px-12 flex flex-row justify-between items-center rounded-lg" >
    <div class="w-1/3 flex flex-row items-center justify-start">
         <h1 class="text-2xl font-semibold txt">Gruppe 3</h1>
    </div>
    <nav class="navbar w-1/3">
        <ul class="w-full flex flex-row justify-center items-center gap-8">
            <li><a href="http://bioclient1.bio.ifi.lmu.de/~hummelj/cgi-bin/home.py" id="teamLink">Home</a></li>
            <li><a href="http://bioclient1.bio.ifi.lmu.de/~hummelj/cgi-bin/tasks.py" id="tasksLink">Aufgaben</a></li>
        </ul>
    </nav>
    <div class="w-1/3 flex flex-row items-center justify-end">
        <button id="dark-mode-toggle" class="inline-block ">
            <i class="fas fa-moon"></i>
        </button>
    </div>

</header>
<div class="bg-gray-50 flex flex-col items-start justify-start gap-4 mt-4">
    <div class=" box relative w-full rounded-lg flex flex-col justify-start items-center">
        <div class="py-4 flex flex-col justify-start items-start w-11/12 gap-2">
            <h1 class="text-base font-normal txt-lgt">Gruppe:</h1>
            <div class="w-full h-0.5 bg-txt-lgt-mx rounded-full"></div>
            <div id="profilesContainer" class="w-full flex flex-row justify-between items-center"></div>        
        </div>
    </div>    
</div>
<div class="bg-gray-50 flex flex-row items-start justify-start gap-4 mt-4">
    <div class=" box w-2/4 relative rounded-lg flex flex-col justify-start items-center">
        <div class="py-4 flex flex-col justify-start items-start w-11/12 gap-2">
            <h1 class="text-base font-normal txt-lgt">Letzte Commits:</h1>
            <div class="w-full h-0.5 bg-txt-lgt-mx rounded-full"></div>
            
        </div>
    </div>
    <div class=" box w-1/4 relative rounded-lg flex flex-col justify-start items-center">
        <div class="py-4 flex flex-col justify-start items-start w-11/12 gap-2">
            <h1 class="text-base font-normal txt-lgt">Links:</h1>
            <div class="w-full h-0.5 bg-txt-lgt-mx rounded-full"></div>
            <div id="linksContainer" class="w-full flex flex-row justify-between items-center"></div>        
        </div>
    </div>
    <div class=" box w-1/4 relative rounded-lg flex flex-col justify-start items-center">
        <div class="py-4 flex flex-col justify-start items-start w-11/12 gap-2">
            <h1 class="text-base font-normal txt-lgt">Betreuer:</h1>
            <div class="w-full h-0.5 bg-txt-lgt-mx rounded-full"></div>
            <div id="ifiProfilesContainer" class="w-full flex flex-row justify-between items-center"></div>        
        </div>
    </div>
    
</div>
<script type="module">
        import { group_profiles, ifi_profiles, links} from "../js/static_data.js"
        generateProfiles(group_profiles);   
        generateProfiles(ifi_profiles, true);
        generateLinks(links);
    </script>
</body>
</html>
"""

print("Content-type: text/html\n\n")
print(html_content)