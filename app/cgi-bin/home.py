#!/usr/bin/python3

html_content = """
<!DOCTYPE html>
<html>
<head>
    <title>Welcome to My Website</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link rel="stylesheet" href="../css/styles.css"> <!-- Reference to external CSS file -->
    <script src="../js/utils.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
</head>
<body class='bg-gray-100'>
    <div class="container mx-auto px-4 py-8 text-center">
        <h1 class='text-3xl font-bold text-gray-800'>Welcome to My Website</h1>
        <p class='text-lg text-gray-600 mt-4'>This is a simple landing page served by a Python CGI script.</p>
        <button id="dark-mode-toggle" class="mt-8 inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            <i class="fas fa-moon"></i> Toggle Dark Mode
        </button>
        <a href="about.cgi" class="mt-8 inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Learn More</a>
    </div>
</body>
</html>
"""

print("Content-type: text/html\n\n")
print(html_content)