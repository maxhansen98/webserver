function loadTasks(args) {
    //console.log("success ", args)
    const fd = new FormData();
    fd.append('query', args);
    fetch('http://bioclient1.bio.ifi.lmu.de/~hummelj/cgi-bin/api/search.py', {
        method: 'POST',
        body: fd
    })
    .then(response => response.json())
    .then(data => {
        console.log("um ", data); 
    }
    )
    .finally(() => {
        loadingAnimation.style.display = 'none';
        runButton.className = 'lnk text-xs font-semibold';
        undoButton.className = 'lnk text-xs font-semibold';
    
    });
}


