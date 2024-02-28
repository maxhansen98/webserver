
//{ id:1, name: "Genome Report", repo_link: "https://gitlab2.cip.ifi.lmu.de/bio/propra_ws23/hummelj/blockgruppe3/-/tree/8_genome_report?ref_type=heads", input:{parameters:[{name:"Organism", required:true, type: "file", accept: "image/*, .pdf, .docx" , default:{path:"/home/h/hummelj/propra/blockgruppe3/var/default/genome"}}]}}
var tasks = [
    { id:1, name: "Genome Report", repo_link: "https://gitlab2.cip.ifi.lmu.de/bio/propra_ws23/hummelj/blockgruppe3/-/tree/8_genome_report?ref_type=heads", input:{parameters:[{name:"Organism", required:true, type: "text", default:{path:"Escherichia coli; Actinomyces oris"}}]}},
];

function openTasks(open_tasks) {
    var tasksHtml = "";
    open_tasks.forEach(function(task_id) {
        console.log("tid: ", task_id)
        const task = tasks.find(task => task.id === task_id);
        if (task) {
            tasksHtml += `
            <div class="flex flex-col justify-start items-center gap-4 w-full rounded-lg box">
                <div class="py-4 flex flex-col justify-start items-start w-11/12 gap-2">
                    <h1 class="text-base font-normal txt-lgt">${task.name}:</h1>
                    <div class="w-full h-0.5 bg-txt-lgt-mx rounded-full"></div>
                    <div class="mt-2 border border-gray-300 rounded-lg px-4 py-2 flex flex-col justify-start items-start w-full gap-2">
                        <h1 class="text-sm font-semibold italic txt-lgt">Input:</h1>
        `;
            task.input.parameters.forEach(function(param) {
                switch (param.type) {
                    case 'text':
                        tasksHtml += `
                        <div class="flex flex-row items-center justify-start px-4 gap-2">
                            <p class="text-xs font-normal txt-lgt">${param.name}:</p>
                            <form>
                            <input class="box border border-gray-300 px-2 py-0.5 text-xs font-normal txt-lgt rounded-sm w-64" type="text" name="${param.name}" ${param.required ? 'required' : ''}>
                            </form>
                        </div>
                    `;
                      break;
                    case 'file':
                        tasksHtml += `
                        <div class="flex flex-row items-center justify-start px-4 gap-2">
                            <p class="text-xs font-normal txt-lgt">${param.name}:</p>
                            <form id="formElem">
                                <input class="box py-0.5 text-xs font-normal txt-lgt w-64" type="file" name="${param.name}" ${param.required ? 'required' : ''} ${param.accept ? 'accept="' + param.accept + '"' : ''}>
                                <input type="submit">
                            </form>
                        </div>
                        `;
                        break;
                    default:
                      break;
                  }
                
            });
            
            const codeFontStyle = "font-family: 'Courier New', Courier, monospace; font-style: italic;";
            
            tasksHtml += `
                        <div class="w-full flex flex-row items-center justify-end px-4 gap-4">
                            <button><p class="lnk text-xs font-semibold">Undo</p></a></button>
                            <button onclick="
                            {
                                
                                const task = tasks.find(task => task.id === ${task.id});
                                const jsonData = {};
                                task.input.parameters.forEach(function(param) {
                                    document.querySelectorAll(\'input\').forEach(function(p) {
                                        if (param.name===p.name){
                                            const input_id = p.name;
                                            const input_data = p.value;
                                            if (input_data !== undefined){  
   
                                                jsonData[input_id.toLowerCase()]=input_data;                                             
                                            }
                                            
                                        }
                                        
                                    });
                                });
                                console.log('js: ', jsonData);
                                fetch('http://bioclient1.bio.ifi.lmu.de/~hummelj/cgi-bin/api/genome-length.py', {
                                    method: 'POST',
                                    body: JSON.stringify(jsonData),
                                    contentType: 'application/json'
                                })
                                .then(response => response.json())
                                .then(data => {
                                    console.log(data);
                                    const outputSection = document.getElementById('outputSection');
                                    outputSection.innerHTML = '';
                                    for (const [key, value] of Object.entries(data)) {
                                        const p = document.createElement('p');
                                        p.className = 'text-xs font-normal txt-lgt';
                                        p.innerHTML = key + ': ' + value.output;
                                        outputSection.appendChild(p);
                                    }
                                }
                                )
                                
                            }
                            "><p class="lnk text-xs font-semibold">Run</p></a></button>
                            
                            </form>
                        </div>
                    </div>
                    <div class="mt-2 border border-gray-300 rounded-lg px-4 py-2 flex flex-col justify-start items-start w-full gap-2">
                        <h1 class="text-sm font-semibold italic txt-lgt">Output:</h1>
                        <div id="outputSection" class="w-full flex flex-col justify-start items-start gap-2 px-4" style="${codeFontStyle}"></div>
                    </div>
                </div>
            </div>
        `;
        }
    });

    return document.getElementById("tasksContainer").innerHTML = tasksHtml;
}

