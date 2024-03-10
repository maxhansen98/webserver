
const tasks = [
    { id:1, name: "Genome Report", repo_url: "https://gitlab2.cip.ifi.lmu.de/bio/propra_ws23/hummelj/blockgruppe3/-/tree/8_genome_report?ref_type=heads", input:{parameters:[{name:"Organism(s)", id:"organism", required:true, type: "text", default:'"Escherichia coli" "Actinomyces oris"'}]}, api_url:"http://bioclient1.bio.ifi.lmu.de/~hummelj/cgi-bin/api/genome-length.py", output:{type: "text", format:"" , default:''}},
    { id:2, name: "AC Search", repo_url: "https://gitlab2.cip.ifi.lmu.de/bio/propra_ws23/hummelj/blockgruppe3/-/tree/acsearch", input:{parameters:[{name:"AC number", id:"ac", required:true, type: "text", default:'"P12345"'}]}, api_url:"http://bioclient1.bio.ifi.lmu.de/~hummelj/cgi-bin/api/acsearch.py", output:{type: "text", format:"" , default:''}},
    { id:3, name: "Swissprot Keyword Search", repo_url: "https://gitlab2.cip.ifi.lmu.de/bio/propra_ws23/hummelj/blockgruppe3/-/tree/spkeyword?ref_type=heads", input:{parameters:[{name:"Keyword(s)", id:"keyword", required:true, type: "text", default:'"Atherosclerosis" "Endonuclease"'},{name:"Swissprot", id:"swissprot", required:true, type: "file", default:'swissprot45_head.dat'}]}, api_url:"http://bioclient1.bio.ifi.lmu.de/~hummelj/cgi-bin/api/spksearch.py", output:{type: "text", format:"" , default:''}},
    { id:4, name: "Prosite Pattern Scan", repo_url: "https://gitlab2.cip.ifi.lmu.de/bio/propra_ws23/hummelj/blockgruppe3/-/tree/psscan?ref_type=heads", input:{parameters:[{name:"Pattern", id:"pattern", required:true, type: "text", default:'"[LIVMF]-H-x(2)-G-{STC}-[STAGP]-x-[LIVMFY]"'},{name:"or Pattern by Prosite ID", id:"web", required:true, type: "text", default:'"PS00017"'},{name:"Sequence", id:"fasta", required:true, type: "file", default:'multi.fasta'},{name:"Run on Prosite Web?", id:"extern", required:true, type: "bool", default:''}]}, api_url:"http://bioclient1.bio.ifi.lmu.de/~hummelj/cgi-bin/api/psscan.py", output:{type: "text", format:"" , default:''}},
    { id:5, name: "Genome to AA Seq", repo_url: "https://gitlab2.cip.ifi.lmu.de/bio/propra_ws23/hummelj/blockgruppe3/-/tree/10_dna2rna", input:{parameters:[{name:"Genome", id:"organism", required:true, type: "file", default:'Escherichia_coli.genome.fa'},{name:"Features", id:"features", required:true, type: "file", default:'Escherichia_coli.featuretable.tsv'}]}, api_url:"http://bioclient1.bio.ifi.lmu.de/~hummelj/cgi-bin/api/dna2rna.py", output:{type: "text", format:"fasta" , default:''}},
    { id:6, name: "Homstrad", repo_url: "https://gitlab2.cip.ifi.lmu.de/bio/propra_ws23/hummelj/blockgruppe3/-/tree/homstrad", input:{parameters:[{name:"PDB-ID", id:"pdb", required:true, type: "text", default:'"2cro"'}]}, api_url:"http://bioclient1.bio.ifi.lmu.de/~hummelj/cgi-bin/api/homstrad.py", output:{type: "text", format:"alignment" , default:''}},
    { id:7, name: "ORF Finder", repo_url: "https://gitlab2.cip.ifi.lmu.de/bio/propra_ws23/hummelj/blockgruppe3/-/tree/orf_finder?ref_type=heads", input:{parameters:[{name:"Genome", id:"fasta", required:true, type: "file", default:'Escherichia_coli.genome.fa'}]}, api_url:"http://bioclient1.bio.ifi.lmu.de/~hummelj/cgi-bin/api/orf.py", output:{type: "text", format:"fasta" , default:''}},
   
    

]

function toFasta(unformattedText){
    const lines = unformattedText.split('\n');

    let fastaList = [];
    let currentHeader = '';
    let currentSequence = '';

    // Iterate through each line
    lines.forEach((line) => {
        // Remove any leading or trailing whitespace
        line = line.trim();

        // Check if the line is empty
        if (line !== '') {
            // Check if the line starts with '>'
            if (line.startsWith('>')) {
                // If it starts with '>', it's a header
                // Push the previous header and sequence to the list
                if (currentHeader !== '') {
                    fastaList.push({ head: currentHeader, sequence: currentSequence });
                }
                // Reset currentHeader to the new header
                currentHeader = line;
                // Reset currentSequence for the new sequence
                currentSequence = '';
            } else {
                // If it doesn't start with '>', it's part of the sequence
                // Append the line to the currentSequence
                currentSequence += line;
            }
        }
    });

    // Push the last header and sequence to the list
    if (currentHeader !== '') {
        fastaList.push({ head: currentHeader, sequence: currentSequence });
    }

    return fastaList;
}

function runATask(task_id) {
    const task = tasks.find(task => task.id === task_id);
    const fd = new FormData();
    task.input.parameters.forEach(function(param) {
        if (param.type === 'text' || param.type === 'selector') {
            const inputElement = document.getElementById(`in_${param.name}_${task_id}`); 
            fd.append(param.id, inputElement.value);
        } else if (param.type === 'file') {
            const fileElement = document.getElementById(`in_${param.name}_${task_id}`);
            const file = fileElement.files[0];
            fd.append(param.id, file);
        } else if (param.type === 'bool') {
            const checkboxElement = document.getElementById(`in_${param.name}_${task_id}`);
            fd.append(param.id, checkboxElement.checked);
        }
    });
    console.log(...fd);
    const loadingAnimation = document.getElementById('loadingAnimation_' + task_id);
    const runButton = document.getElementById('runButtonText_' + task_id);
    const undoButton = document.getElementById('undoButtonText_' + task_id);
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
            if (task.output.type === 'text') {
                if (task.output.format === 'fasta') {
                    const fastaList = toFasta(value.output);
                    fastaList.forEach(fasta => {
                        const p = document.createElement('p');
                        p.className = 'text-xs font-normal txt-lgt break-all';
                        p.innerHTML = fasta.head;
                        outputSection.appendChild(p);
                        const p2 = document.createElement('p');
                        p2.className = 'text-xs font-normal txt-lgt break-all';
                        p2.innerHTML = fasta.sequence;
                        outputSection.appendChild(p2);
                    });
                } else {
                    const p = document.createElement('p');
                    p.className = 'text-xs font-normal txt-lgt break-all';
                    p.innerHTML = value.output;
                    outputSection.appendChild(p);
                }                
            } 
        }  
    }
    )
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
            
            return input;
           
        }).join('');
        const taskHtml = basicTask(task, children);
        const taskElement = document.createElement("div");
        taskElement.innerHTML = taskHtml.trim();
        tasksContainer.appendChild(taskElement.firstChild);
    });

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
                    outputSection.className = 'w-full flex flex-col justify-start items-start px-4';
                    const hd = document.getElementById('btnhide_${task_id}');
                    const slf = document.getElementById('btnopen_${task_id}');
                    hd.className = '';
                    slf.className = 'hidden';
                }"><p class="lnk text-xs font-semibold">Open</p></a></button>
            </div>
            <div id="outputSection_${task_id}" class="w-full flex flex-col justify-start items-start px-4 gap-2" style="${codeFontStyle}"></div>
            <script type="text/javascript">
                jmolApplet0 = Jmol.getApplet("jmolApplet0", Info);
                Jmol.script(jmolApplet0,"background black; load 1a0k.pdb; cartoon only; spin on; color structure;")
            </script>
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
        case 'file':
            return `
                <div class="flex flex-row items-center justify-start px-4 gap-2">
                    <p class="text-xs font-normal txt-lgt">${param.name}:</p>
                    <form>
                        <input id="in_${param.name}_${task_id}" class="bg-transparent text-xs font-normal txt-lgt rounded-sm mx-2 my-0.5" type="file" name="${param.name}" ${param.required ? 'required' : ''}>
                    </form>
                    <p class="text-xs font-normal txt-lgt">Example:</p>
                    <p class="text-xs font-normal txt-lgt italic">${param.default}</p>
                </div>
                
            `;
        case 'bool': 
            return `
                <div class="flex flex-row items-center justify-start px-4 gap-2">
                    <p class="text-xs font-normal txt-lgt">${param.name}:</p>
                    <form>
                        <input id="in_${param.name}_${task_id}" class="mx-2 my-0.5" type="checkbox" name="${param.name}" ${param.required ? 'required' : ''}>
                    </form>
                </div>
            `;
        case 'selector':
            return `
                <div class="flex flex-row items-center justify-start px-4 gap-2">
                    <p class="text-xs font-normal txt-lgt">${param.name}:</p>
                    <form>
                        <select id="in_${param.name}_${task_id}" class="bg-transparent border border-gray-300 px-2 py-0.5 text-xs font-normal txt-lgt rounded-sm w-96" name="${param.name}" ${param.required ? 'required' : ''}>
                            ${param.options.map(option => `<option value="${option.value}">${option.label}</option>`).join('')}
                        </select>
                    </form>
                    <p class="text-xs font-normal txt-lgt">Example:</p>
                    <p class="text-xs font-normal txt-lgt italic">${param.default}</p>
                </div>
            `;
        default:
            
    }
}

function basicTask(task, children) {
    const codeFontStyle = "font-family: 'Courier New', Courier, monospace; font-style: italic;";
    const taskHtml = `
        <div class="flex flex-col justify-center items-center w-full rounded-lg box p-4">
            <div class="flex flex-col justify-start items-start w-full gap-2">
                <div class="flex flex-row justify-between w-full">
                    <h1 class="text-base font-normal txt-lgt">${task.name}:</h1>
                    <a class="cursor-pointer" href="${task.repo_url}" target="_blank"><img src="https://gitlab2.cip.ifi.lmu.de/assets/logo-911de323fa0def29aaf817fca33916653fc92f3ff31647ac41d2c39bbe243edb.svg" width="20" height="20" /></a>
                </div>
                <div class="w-full h-0.5 bg-txt-lgt-mx rounded-full"></div>
                <div class="mt-2 border border-gray-300 rounded-lg px-4 py-2 flex flex-col justify-start items-start w-full gap-2">
                    <h1 class="text-sm font-semibold italic txt-lgt">Input:</h1>                    
                    ${children}
                </div>
                <div class="flex flex-row justify-end items-center gap-2 w-full">
                    <div id="loadingAnimation_${task.id}" style="display: none;" class="text-xs font-semibold txt-lgt">Loading...</div> 
                    <button id="undoButton_${task.id}"><p id="undoButtonText_${task.id}" class="lnk text-xs font-semibold">Undo</p></button>
                    <button id="runButton_${task.id}" onclick="runATask(${task.id})"><p id="runButtonText_${task.id}" class="lnk text-xs font-semibold">Run</p></button>
                </div>
                <div id="outputTag_${task.id}" class="mt-2 border border-gray-300 rounded-lg px-4 py-2 flex flex-col justify-start items-start w-full gap-2 hidden">
                    <div class="flex flex-row justify-between items-start w-full">    
                        <h1 class="text-sm font-semibold italic txt-lgt">Output:</h1>
                        <button id="btnhide_${task.id}" onclick="{
                            const outputSection = document.getElementById('outputSection_${task.id}');
                            outputSection.className = 'hidden';
                            const slf = document.getElementById('btnhide_${task.id}');
                            const opn = document.getElementById('btnopen_${task.id}');
                            slf.className = 'hidden';
                            opn.className = '';
                        }"><p class="lnk text-xs font-semibold">Hide</p></a></button>
                        <button class="hidden" id="btnopen_${task.id}" onclick="{
                            const outputSection = document.getElementById('outputSection_${task.id}');
                            outputSection.className = 'w-full flex flex-col justify-start items-start px-4';
                            const hd = document.getElementById('btnhide_${task.id}');
                            const slf = document.getElementById('btnopen_${task.id}');
                            hd.className = '';
                            slf.className = 'hidden';
                        }"><p class="lnk text-xs font-semibold">Open</p></a></button>
                    </div>
                    <div id="outputSection_${task.id}" class="w-full flex flex-col justify-start items-start px-4" style="${codeFontStyle}"></div>
                </div>
            </div>
        </div>
    `;
    return taskHtml;
}
