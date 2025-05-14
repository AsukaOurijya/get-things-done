document.addEventListener("DOMContentLoaded", () => {
    const stored = JSON.parse(localStorage.getItem('tasks'))

    if (stored) {
        stored.array.forEach((task) => tasks.push(task)) 
        updateTasksList();
        updateStats();
    }
})

let tasks = [];

const saved = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

const addtask = () => {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();

    if (text) {
        tasks.push({text:text,completed: false});
        updateTasksList();
        taskInput.value = "";
        updateStats();
        saved();
    }
};

const toggleTaskComplete = (index) => {
    tasks[index].completed  = !tasks[index].completed;
    updateTasksList();
    updateStats();
    saved();
};

const deleteTask = (index) => {
    tasks.splice(index,1);
    updateTasksList();
    updateStats();
    saved();
};

const editTask = (index) => {
    const taskInput = document.getElementById('taskInput');
    taskInput.value = tasks[index].text;
    tasks.splice(index,1);
    updateTasksList();
    updateStats();
    saved();
};

const updateStats = () => {
    const completeTask = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length; 
    const progressbar = document.getElementById('progress');

    let progress = 0;

    if (totalTasks > 0) {
        progress = (completeTask / totalTasks) * 100;
        progressbar.style.backgroundColor = "darkred";
    } else {
        progressbar.style.backgroundColor = "yellow";
    }

    progressbar.style.width = `${progress}%`;
    document.getElementById('num').innerText = `${completeTask} / ${totalTasks}`;

}; 

const updateTasksList = () => {
    const taskList = document.querySelector('.task-list');
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");

        listItem.innerHTML = `
        <div class="taskItem">
                <div class="task ${task.completed ? 'completed':''}">
                    <input type="checkbox" class="checkbox" ${
                        task.completed ? "checked" : ""
                    }/>
                    <p>${task.text}</p>
                </div>
                <div class="icons"> 
                    <img src="./media/edit.png" alt="Edit" onClick="editTask(${index})"/>
                    <img src="./media/bin.png" alt="Delete" onClick="deleteTask(${index})"/>
                </div>
        </div>
        `;
        listItem.addEventListener("change", () => toggleTaskComplete(index));
        taskList.append(listItem);
    });
};

document.getElementById('submit').addEventListener('click', function(e) {
    e.preventDefault();
    addtask();
});

