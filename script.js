let form = document.getElementById("form");
let titleInput = document.getElementById("title_input");
// let dateInput = document.getElementById("dateInput");
let descInput = document.getElementById("desc_input");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add_task");
let filterOptions = document.querySelector('#filter_btn')

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
  filterTasks()
});

let formValidation = () => {
  if (titleInput.value === "") {
    console.log("failure");
    msg.innerHTML = "Task cannot be blank";
  } else {
    console.log("success");
    msg.innerHTML = "";
    acceptData();
    add.click();

  }
};

let data = [{}];

let acceptData = () => {
  data.push({
    text: titleInput.value,
    description: descInput.value,
  });

  localStorage.setItem("data", JSON.stringify(data));
  createTasks();
};

let createTasks = () => {
  tasks.innerHTML = "";
  data.map((x, y) => {
    return (tasks.innerHTML += `
    <div id='task_list'>
          <div id='task_wrap'>
            <h3>${x.text}</h3>
            <p id='task__desc'>${x.description}</p>
          </div>
  
          <span class="options">
            <p onClick= "completeTask(this)">completed</p>
            <p onClick ="deleteTask(this)">delete</p>
          </span>
        </div>
    `);
  });

  resetForm();
};

let deleteTask = (e) => {
  e.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem("data", JSON.stringify(data));
  console.log(data);
  
};

let completeTask = (e) => {
  let selectedTask = e.parentElement.parentElement;
  selectedTask.classList.add("completed");

};

let resetForm = () => {
  titleInput.value = "";
  descInput.value = "";
};

(() => {
  data = JSON.parse(localStorage.getItem("data")) || []
  console.log(data);
  createTasks();
})();

let filterTasks = (e) => {
  const task = tasks.childNodes
  tasks.forEach(function (task) {
      switch (e.target.value) {
          case "all":
              task.style.display = "flex"
              break;

          case "completed":
              if (task.classList.contains("completed")) {
                  task.style.display = "flex"
              } else {
                  task.style.display = "none"
              }
              break;
      }
  })
}