let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

displayTasks();

function addTask() {

    const taskInput = document.getElementById("taskInput");
    const taskDate = document.getElementById("taskDate");

    if(taskInput.value.trim() === ""){
        alert("Please Enter Task");
        return;
    }

    const task = {
        text: taskInput.value,
        date: taskDate.value,
        completed:false
    };

    tasks.push(task);

    saveTasks();

    taskInput.value="";
    taskDate.value="";

    displayTasks();
}

function displayTasks(){

    const taskList = document.getElementById("taskList");

    taskList.innerHTML="";

    tasks.forEach((task,index)=>{

        const li=document.createElement("li");

        li.innerHTML=`
        <div class="task-info ${task.completed ? 'completed' : ''}">
            <strong>${task.text}</strong><br>
            <small>${task.date || "No Date & Time"}</small>
        </div>

        <div class="task-buttons">

            <button class="complete-btn"
            onclick="toggleComplete(${index})">
            ${task.completed ? 'Undo' : 'Done'}
            </button>

            <button class="edit-btn"
            onclick="editTask(${index})">
            Edit
            </button>

            <button class="delete-btn"
            onclick="deleteTask(${index})">
            Delete
            </button>

        </div>
        `;

        taskList.appendChild(li);
    });
}

function toggleComplete(index){

    tasks[index].completed=!tasks[index].completed;

    saveTasks();
    displayTasks();
}

function editTask(index){

    let newTask=prompt(
        "Edit Task",
        tasks[index].text
    );

    if(newTask!==null && newTask.trim()!==""){

        tasks[index].text=newTask;

        saveTasks();
        displayTasks();
    }
}

function deleteTask(index){

    if(confirm("Delete this task?")){

        tasks.splice(index,1);

        saveTasks();
        displayTasks();
    }
}

function saveTasks(){

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}