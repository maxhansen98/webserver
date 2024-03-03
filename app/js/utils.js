document.addEventListener("DOMContentLoaded", function() {
    setInitialTheme();
    var darkModeToggle = document.getElementById("dark-mode-toggle");
    if (darkModeToggle) {
        darkModeToggle.addEventListener("click", function() {
            toggleDarkMode();
        });
    }
});


function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
        .then(() => {
            alert('Discord handle copied to clipboard: ' + text);
        })
        .catch(err => {
            console.error('Could not copy text: ', err);
        });
}

function generateProfiles(profiles, ifi=false) {
    var profilesHtml = "";
    if (ifi) {
        profilesHtml += `<ul>`
        profiles.forEach(function(profile) {
            profilesHtml += `
            <li class="ml-4">
                <p class="txt text-sm font-normal">${profile.name}</p>
            </li>
            `;
        });
        profilesHtml += `</ul>`
        return document.getElementById("ifiProfilesContainer").innerHTML = profilesHtml;
    }
    else {
        profiles.forEach(function(profile) {
            profilesHtml += `
                <div class="profile">
                    <img src="${profile.image}" alt="${profile.name}">
                    <div class "flex flex-col justify-start items-start gap-4>
                        <p class="txt text-xl font-normal">${profile.name}</p>
                        <p class="txt-lgt text-sm font-normal underline ">GitHub:
                        <a href="${profile.link}" target="_blank"><p class="lnk text-sm font-normal">@${profile.profile}</p></a></p>
                        <p class="txt-lgt text-sm font-normal underline ">Discord:<p class="txt-lgt text-sm font-normal italic clip" onclick="">${profile.discord}</p></p>
                    </div>
                </div>
            `;
        });

        
        return document.getElementById("profilesContainer").innerHTML = profilesHtml;
    }
}

function generateLinks(links) {
    var linksHtml = "<ul>";
    links.forEach(function(link) {
        linksHtml += `
            <li class="ml-4">
                <a href="${link.link}" target="_blank"><p class="lnk text-sm font-normal">${link.name}</p></a>
            </li>
        `;
    });

    linksHtml += "</ul>"
    return document.getElementById("linksContainer").innerHTML = linksHtml;
}




