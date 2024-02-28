const tasks = [
    { id:1, name: "Genome Report", repo_url: "https://gitlab2.cip.ifi.lmu.de/bio/propra_ws23/hummelj/blockgruppe3/-/tree/8_genome_report?ref_type=heads", input:{parameters:[{name:"Organism(s)", id:"organism", required:true, type: "text", default:'"Escherichia coli" "Actinomyces oris"'}]}, api_url:"http://bioclient1.bio.ifi.lmu.de/~hummelj/cgi-bin/api/genome-length.py"},
    { id:2, name: "AC Search", repo_url: "https://gitlab2.cip.ifi.lmu.de/bio/propra_ws23/hummelj/blockgruppe3/-/tree/acsearch", input:{parameters:[{name:"AC number", id:"ac", required:true, type: "text", default:'"P12345"'}]}, api_url:"http://bioclient1.bio.ifi.lmu.de/~hummelj/cgi-bin/api/acsearch.py"},
    
    
]
function runTask(task_id) {
    const task = tasks.find(task => task.id === task_id);
    const fd = new FormData();
    task.input.parameters.forEach(function(param) {
        document.querySelectorAll('input').forEach(function(tag) {
            console.log(param);
            if (param.name===tag.name){
                const input_id = param.id;
                const input_data = tag.value;
                if (input_data !== undefined){  
                    fd.append(input_id, input_data);                                             
                }
            }
        });
    });
    console.log(...fd);
    const loadingAnimation = document.getElementById('loadingAnimation');
    const runButton = document.getElementById('runButtonText');
    const undoButton = document.getElementById('undoButtonText');
    loadingAnimation.style.display = 'inline-block';
    runButton.className = 'text-blue-300 text-xs font-semibold cursor-not-allowed';
    undoButton.className = 'text-blue-300 text-xs font-semibold cursor-not-allowed';

    fetch(task.api_url, {
        method: 'POST',
        body: fd
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const outputTag = document.getElementById('outputTag_' + task.id);
        outputTag.className = 'mt-2 border border-gray-300 rounded-lg px-4 py-2 flex flex-col justify-start items-start w-full gap-2';
        const outputSection = document.getElementById('outputSection_' + task.id);
        outputSection.innerHTML = '';
        for (const [key, value] of Object.entries(data)) {
            const p = document.createElement('p');
            p.className = 'text-xs font-normal txt-lgt';
            p.innerHTML = value.output;
            outputSection.appendChild(p);
        }
    })
    .finally(() => {
        loadingAnimation.style.display = 'none';
        runButton.className = 'lnk text-xs font-semibold';
        undoButton.className = 'lnk text-xs font-semibold';
    
    });
    
    
}

function loadTasks() {
    const tasksContainer = document.getElementById("tasksContainer");
    tasksContainer.innerHTML = '';
    tasks.forEach(task=>{
        const children = task.input.parameters.map(param => {
            const input = inputTag(param, task.id);
            const process = processingTag(param, task.id);
            const output = outputTag(task.id);
            return input + process + output;
           
        }).join('');
        const taskHtml = basicTask(task, children);
        const taskElement = document.createElement("div");
        taskElement.innerHTML = taskHtml.trim();
        
        tasksContainer.appendChild(taskElement.firstChild);

    });

    console.log("test ", tasksContainer);
}
function processingTag(param, task_id) {
    const codeFontStyle = "font-family: 'Courier New', Courier, monospace; font-style: italic;";
    const processElement = document.createElement("div");
    

    processElement.classList.add("flex", "flex-row", "items-center", "justify-end", "gap-2", "w-full");
    processElement.innerHTML = `

                    <div id="loadingAnimation" style="display: none;" class="text-xs font-semibold txt-lgt">
                        Loading...
                    </div> 
                    <button id="undoButton"><p id="undoButtonText" class="lnk text-xs font-semibold">Undo</p></a></button>
                    <button id="runButton" onclick="runTask(${task_id})"><p id="runButtonText" class="lnk text-xs font-semibold">Run</p></a></button>
                            
            	
            `;

    console.log("processElement ", processElement.querySelector("#runButton"));

    return processElement.outerHTML;


}


function outputTag(task_id) {
    const codeFontStyle = "font-family: 'Courier New', Courier, monospace; font-style: italic;";
    return `
        <div id="outputTag_${task_id}" class="mt-2 border border-gray-300 rounded-lg px-4 py-2 flex flex-col justify-start items-start w-full gap-2 hidden">
            <div class="flex flex-row justify-between items-start w-full">    
                <h1 class="text-sm font-semibold italic txt-lgt">Output:</h1>
                <button id="btnhide_${task_id}" onclick="{
                    const outputSection = document.getElementById('outputSection_${task_id}');
                    outputSection.className = 'hidden';
                    const slf = document.getElementById('btnhide_${task_id}');
                    const opn = document.getElementById('btnopen_${task_id}');
                    slf.className = 'hidden';
                    opn.className = '';
                }"><p class="lnk text-xs font-semibold">Hide</p></a></button>
                <button class="hidden" id="btnopen_${task_id}" onclick="{
                    const outputSection = document.getElementById('outputSection_${task_id}');
                    outputSection.className = 'w-full flex flex-col justify-start items-start gap-2 px-4';
                    const hd = document.getElementById('btnhide_${task_id}');
                    const slf = document.getElementById('btnopen_${task_id}');
                    hd.className = '';
                    slf.className = 'hidden';
                }"><p class="lnk text-xs font-semibold">Open</p></a></button>
            </div>
            <div id="outputSection_${task_id}" class="w-full flex flex-col justify-start items-start gap-2 px-4" style="${codeFontStyle}"></div>
        </div>
    `;
}


function inputTag(param, task_id) {
    switch (param.type) {
        case 'text':
            return `
                
                <div class="flex flex-row items-center justify-start px-4 gap-2">
                    <p class="text-xs font-normal txt-lgt">${param.name}:</p>
                    <form>
                        <input id="in_${param.name}_${task_id}" class="bg-transparent border border-gray-300 px-2 py-0.5 text-xs font-normal txt-lgt rounded-sm w-96" type="text" name="${param.name}" ${param.required ? 'required' : ''}>
                    </form>
                    <p class="text-xs font-normal txt-lgt">Example:</p>
                    <p class="text-xs font-normal txt-lgt italic">${param.default}</p>
            	</div>
            `;
        case 'input':
        default:
            
    }
}

function basicTask(task, children) {
    const taskHtml = `
        <div class="flex flex-col justify-center items-center w-full rounded-lg box p-4">
            <div class="flex flex-col justify-start items-start w-full gap-2">
                <h1 class="text-base font-normal txt-lgt">${task.name}:</h1>
                <div class="w-full h-0.5 bg-txt-lgt-mx rounded-full"></div>
                <div class="mt-2 border border-gray-300 rounded-lg px-4 py-2 flex flex-col justify-start items-start w-full gap-2">
                    <div class="flex flex-row justify-between w-full">
                        <h1 class="text-sm font-semibold italic txt-lgt">Input:</h1>                    
                        <a class="cursor-pointer" href="${task.repo_url}" target="_blank"><img src="https://gitlab2.cip.ifi.lmu.de/assets/logo-911de323fa0def29aaf817fca33916653fc92f3ff31647ac41d2c39bbe243edb.svg" width="20" height="20" /></a>
                    </div>
                    ${children}
                </div>
            </div>
        </div>

    `;
    return taskHtml;
}