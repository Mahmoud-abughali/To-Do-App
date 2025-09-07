let TaskNameInput = document.getElementById("TaskName");
const AddButton = document.getElementById("add-btn");
const List = document.getElementById("list");
const taskForm = document.getElementById("formm");
let listContrainer = document.getElementById('list-Contrainer');


function getTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTask(task) {
  let div = document.createElement('div');
  let ListTaskName = document.createElement('p');
  ListTaskName.textContent = task.name;

  let delBtn = document.createElement('button');
  delBtn.textContent = 'Remove';
  delBtn.classList.add('del-button');
  delBtn.setAttribute('id', task.id);

  let finished = document.createElement('input');
  finished.type = 'checkbox';
  finished.setAttribute('id', task.id);
  finished.checked = task.completed;

  let ListItem = document.createElement('li');
  ListItem.setAttribute('id', task.id);
  ListTaskName.setAttribute('id', task.id);

  if (task.completed) {
    ListItem.classList.add("completed");
  }

  div.append(delBtn, finished);
  ListItem.append(ListTaskName, div);
  List.append(ListItem);
}

function renderAllTasks() {
  List.innerHTML = "";
  let tasks = getTasks();
  tasks.forEach(task => renderTask(task));
}


function creat() {
  let id = Math.random().toString();
  let TaskName = TaskNameInput.value.trim();
  if (TaskName === "") return;

  let newTask = { id, name: TaskName, completed: false };

  let tasks = getTasks();
  tasks.push(newTask);
  saveTasks(tasks);

  renderTask(newTask);
}


taskForm.addEventListener('submit', e => {
  e.preventDefault();
  creat();
  TaskNameInput.value = "";
});

TaskNameInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    creat();
    TaskNameInput.value = "";
  }
});

listContrainer.addEventListener("click", (e) => {
  if (e.target.classList.contains('del-button')) {
    let ListItemID = e.target.getAttribute("id");

    let itemToRemove = document.getElementById(ListItemID);
    if (itemToRemove) {
      itemToRemove.remove();
    }

    let tasks = getTasks().filter(task => task.id !== ListItemID);
    saveTasks(tasks);
  }
});

listContrainer.addEventListener("change", (e) => {
  if (e.target.type === "checkbox") {
    let ListItemID = e.target.getAttribute("id");
    let itemToModifi = document.getElementById(ListItemID);

    if (itemToModifi) {
      itemToModifi.classList.toggle("completed", e.target.checked);
    }

    let tasks = getTasks();
    tasks = tasks.map(task =>
      task.id === ListItemID ? { ...task, completed: e.target.checked } : task
    );
    saveTasks(tasks);
  }
});

renderAllTasks();
