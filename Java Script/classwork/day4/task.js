let tasks = [];
let priorities = [];

function addTask() {
    const taskInput = document.getElementById('task');
    const priorityInput = document.getElementById('priority');
    const taskList = document.getElementById('listTask');

    let task = taskInput.value.trim();
    let priority = Number(priorityInput.value.trim());

    if(task !== '' && !isNaN(priority) && priority>=1 && priority<=3){

        //pushing entered tasks and priorities to the respective initialized arrays
        tasks.push(task);
        priorities.push(priority);

        const li = document.createElement('li');
        li.textContent = task;

        switch(priority){
            case 1:
                li.classList.add('priority-high');
                break;
            case 2:
                li.classList.add('priority-medium');
                break;
            case 3:
                li.classList.add('priorit-low');
                break;
        }
        const compltButton = document.createElement('button');
        compltButton.textContent = "Complete";
        compltButton.onclick = function(){
            li.classList.toggle('completed')
        };
        li.appendChild(compltButton);

        const editButton = document.createElement('button');
        editButton.textContent = "Edit";
        
        editButton.onclick = function(){

            const newTask = prompt('Edit task:\t', task);
            if(newTask !== null && newTask.trim() !==''){
                const taskIndex = tasks.indexOf(task);
                tasks[taskIndex] = newTask; //update the respective task index in taskarray with new task
                li.firstChild.textContent = newTask; //update the text node in DOM
                task.newTask;
            }
        };
        li.appendChild(editButton);

        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";

        removeButton.onclick = function(){

            taskList.removeChild(li);
            const taskIndex = tasks.indexOf(task);
            tasks.splice(taskIndex,1);
            priorities.splice(taskIndex,1);
        };

        li.appendChild(removeButton);
        taskList.appendChild(li);
        taskInput.value = '';
        priority.value = '';

    }
    else{
        alert("Please enter a valid task priority between 1 and 3");
    }
}