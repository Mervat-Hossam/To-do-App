let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let task_div = document.querySelector(".tasks");

//empty arr
let array_of_tasks = [];

// check if there is tasks in local storge
if(localStorage.getItem("tasks")){
    array_of_tasks = JSON.parse(localStorage.getItem("tasks"));
}

// trigger get data from local storge 
get_data_from_local_storage();

// add tasks
submit.onclick = function(){
    if(input.value !== ""){
        add_task_to_arr(input.value);
        input.value = "";
    }
}

// click on task element
task_div.addEventListener("click", (e) => {
    // delete button
    if(e.target.classList.contains("delete")){
        // remove element from page
        e.target.parentElement.remove();

        // remove element from local storage
        delete_task(e.target.parentElement.getAttribute("data_id"));
    }

    // task element
    if(e.target.classList.contains("task")){
        // toggle completed
        toggle_status_task(e.target.getAttribute("data_id"));

        // toggle done class
        e.target.classList.toggle("done")
    }
})


function add_task_to_arr(task_text){
    //task data
    const task = {
        id : Date.now(),
        title: task_text,
        completed: false
    };

    //push task to arr
    array_of_tasks.push(task);

    //add tasks to page
    add_elements_to_page(array_of_tasks);

    // add tasks to local storage
    add_to_local_storage(array_of_tasks);
}

function add_elements_to_page(array_of_tasks){
    //empty task div
    task_div.innerHTML = "";

    //loop on arr
    array_of_tasks.forEach((task) => {
        let div = document.createElement("div") ;
        div.className = "task";
        // check if task is done
        if(task.completed){
            div.className = "task done";
        }
        div.setAttribute("data_id", task.id);
        div.appendChild(document.createTextNode(task.title));
        let span = document.createElement("span");
        span.className = "delete";
        span.appendChild(document.createTextNode("Delete"));
        div.appendChild(span);

        //add task div to task container
        task_div.appendChild(div);
    });
}

function add_to_local_storage(array_of_tasks){
    window.localStorage.setItem("tasks", JSON.stringify(array_of_tasks))
}

function get_data_from_local_storage(){
    let data = window.localStorage.getItem("tasks");
    if(data){
        let tasks = JSON.parse(data);
        add_elements_to_page(tasks);
    }
}

function delete_task(task_id){
    array_of_tasks = array_of_tasks.filter((task) => task.id != task_id);
    add_to_local_storage(array_of_tasks);
}

function toggle_status_task(task_id){
    for(let i = 0; i < array_of_tasks.length; i++){
        if(array_of_tasks[i].id == task_id){
            array_of_tasks[i].completed == false ? array_of_tasks[i].completed = true : array_of_tasks[i].completed == false;
        }
    }
    add_to_local_storage(array_of_tasks);
}