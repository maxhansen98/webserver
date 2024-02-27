
var tasks = [
    { id:1, name: "Genome Report", repo_link: "https://gitlab2.cip.ifi.lmu.de/bio/propra_ws23/hummelj/blockgruppe3/-/tree/8_genome_report?ref_type=heads", input:{parameters:[{name:"Organism", required:true, type: "file", accept: "image/*, .pdf, .docx" }]}}

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
                            <form>
                                <input class="box py-0.5 text-xs font-normal txt-lgt w-64" type="file" name="${param.name}" ${param.required ? 'required' : ''} ${param.accept ? 'accept="' + param.accept + '"' : ''}>
                            </form>
                        </div>
                        `;
                        break;
                    default:
                      break;
                  }
                
            });
            tasksHtml += `
                        <div class="w-full flex flex-row items-center justify-end px-4 gap-4">
                            <button><p class="lnk text-xs font-semibold">Remove data</p></a></button>
                            <button onclick="
                            {
                                const task = tasks.find(task => task.id === ${task.id});
                                const formData = new FormData();
                                const jsonData = {};
                                task.input.parameters.forEach(function(param) {
                                    document.querySelectorAll(\'input\').forEach(function(p) {
                                        if (param.name===p.name){
                                            const input_id = p.name;
                                            const input_data = p.files[0];
                                            if (input_data !== undefined){                                               
                                                jsonData[input_id.toLowerCase()]=input_data;                                               
                                            }
                                            
                                        }
                                        
                                    });
                                });
                                fetch('http://bioclient1.bio.ifi.lmu.de/~hummelj/cgi-bin/api/genome-length.py', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify(jsonData)
                                })
                                .then(response => {
                                    if (response.ok) {
                                        console.log(response);  
                                        
                                    } else {
                                        throw new Error('Something went wrong');
                                    }
                                    
                                })
                                
                                .catch(error => {
                                    // Handle network errors or other exceptions
                                    console.error('An error occurred', error);
                                });
                                
                            }
                            "><p class="lnk text-xs font-semibold">Run</p></a></button>
                            
                            </form>
                        </div>
                    </div>
                    <div class="mt-2 border border-gray-300 rounded-lg px-4 py-2 flex flex-col justify-start items-start w-full gap-2">
                        <h1 class="text-sm font-semibold italic txt-lgt">Output:</h1>
                        <div id="outputSection" class="w-full flex flex-col justify-start items-start gap-2"></div>
                    </div>
                </div>
            </div>
        `;
        }
    });

    return document.getElementById("tasksContainer").innerHTML = tasksHtml;
}

