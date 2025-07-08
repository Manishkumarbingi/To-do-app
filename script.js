let uncompleted_tasks=[];
let completed_tasks=[];
let content= document.getElementById("content");

let new_task = document.getElementById("new_task");
let taskModal = document.getElementById("taskModal");
let taskOk = document.getElementById("taskOk");
let taskInput = document.getElementById("taskInput");
let mainContent = document.getElementById("app");
let update=document.getElementById("update");
let del= document.getElementById("delete");
let options=document.getElementById("options");
let update_window=document.getElementById("update_window");
let update_task=document.getElementById("update_task");
let update_ok=document.getElementById("update_ok");
let count=document.getElementById("count");
let completed=document.getElementById("completed");
let header=document.getElementById("header");

//syncing the session storage
if (sessionStorage.getItem('uncompleted_tasks')) {
    uncompleted_tasks = JSON.parse(sessionStorage.getItem('uncompleted_tasks'));
}else{
    sessionStorage.setItem('uncompleted_tasks',JSON.stringify(uncompleted_tasks));
}
if (sessionStorage.getItem('completed_tasks')) {
    completed_tasks = JSON.parse(sessionStorage.getItem('completed_tasks'));
} else {
    sessionStorage.setItem('completed_tasks', JSON.stringify(completed_tasks));
}

//uncompleted tasks loading
function load_tasks(uncompleted_tasks,completed_tasks) {
    uncompleted_tasks.forEach(task => {
        
        const element = document.createElement("div");
        element.className = "card";
        element.innerHTML = `
            <input onclick="check('${task}')" type="checkbox" name="task">
            <label>${task}</label>
            <i onclick="modify('${task}')" class="fa-solid fa-ellipsis-vertical"></i>
        `;
        content.prepend(element);
        
    });
    count.innerHTML=`${completed_tasks.length}/${completed_tasks.length+uncompleted_tasks.length}`
}

//For every time opening the website load the initial tasks
load_tasks(uncompleted_tasks,completed_tasks);

//New task button
new_task.addEventListener("click",()=>{
    taskModal.classList.remove('hidden');
    taskModal.classList.add('active');
    mainContent.style.filter = 'blur(5px)';
})

// OK button click: save task and close modal
taskOk.addEventListener("click", () => {
    const newTaskValue = taskInput.value.trim();
    if(newTaskValue) {
        uncompleted_tasks.push(newTaskValue);
        sessionStorage.setItem('uncompleted_tasks', JSON.stringify(uncompleted_tasks));
    }
    taskInput.value = ''; 
    taskModal.classList.remove('active');
    mainContent.style.filter = 'none';
    setTimeout(() => location.reload(), 200);
});

//checked function button
function check(task){
    let index = uncompleted_tasks.indexOf(task);
    uncompleted_tasks.splice(index, 1);
    sessionStorage.setItem("uncompleted_tasks",JSON.stringify(uncompleted_tasks));
    setTimeout(() => location.reload(), 200);
    
    completed_tasks.push(task);
    sessionStorage.setItem("completed_tasks",JSON.stringify(completed_tasks));
}


//options buttons
function modify(task){
    options.classList.remove('hidden');
    options.classList.add('active');
    mainContent.style.filter = 'blur(5px)';
    update.addEventListener("click",()=>{
        update_window.classList.remove('hidden');
        update_window.classList.add('active');
        mainContent.style.filter = 'blur(5px)';
        update_task.value=task;
        update_ok.addEventListener("click", () => {
            const update_value = update_task.value.trim();
            if(update_value) {
                let index = uncompleted_tasks.indexOf(task);
                uncompleted_tasks.splice(index, 1);
                uncompleted_tasks.push(update_value);
                sessionStorage.setItem('uncompleted_tasks', JSON.stringify(uncompleted_tasks));
            }
            update_value.value = ''; 
            update_window.classList.remove('active');
            mainContent.style.filter = 'none';
             location.reload();

        });
    })
    del.addEventListener("click",()=>{
        let index = uncompleted_tasks.indexOf(task);
        uncompleted_tasks.splice(index, 1);
        sessionStorage.setItem("uncompleted_tasks",JSON.stringify(uncompleted_tasks));
        setTimeout(() => location.reload(), 200);
    })
    
}

completed.addEventListener("click",()=>{
    content.innerHTML="";
    completed_tasks.forEach(task => {
        
        const element = document.createElement("div");
        element.className = "card";
        element.innerHTML = `
            <label>${task}</label>
        `;
        content.prepend(element);
        
    });
    header.innerHTML="Fulfilled Tasks";
    completed.innerHTML="Uncompleted Tasks";
    completed.removeAttribute("id");
    completed.id="uncompleted";
    let uncompleted=document.getElementById("uncompleted")
    uncompleted.addEventListener("click",()=>{
        uncompleted.removeAttribute("id");
        uncompleted.id="completed";
        location.reload()
        
})
})
