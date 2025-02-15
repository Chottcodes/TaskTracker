//caputure input from taskName taskDescription and priority
//push up the data to local storage
//get the local storage
//create a function to display the data
//
import { editData, removeObject } from "./editList.js";
const submitButton = document.getElementById("submit-task");
let todolistSectionUl = document.getElementById("ToDoUL");
let taskNameTitle = document.getElementById("task-Name");
const editContainer = document.getElementById("edit-container");
const updateBTN = document.getElementById("update");
const removeBTN = document.getElementById("remove");
const progressSectionUl = document.getElementById("In-Progress-List-UL");
const completedsectionUl = document.getElementById("Completed-List-UL");
let taskId;

submitButton.addEventListener("click", () => {
  const taskName = document.getElementById("Task-Name").value;
  const taskDescription = document.getElementById("Task-Description").value;
  const PrioritySelection = document.getElementById("Priority-Selection").value;
  const dateInput = document.getElementById("calender-input").value;
  let taskArr = JSON.parse(localStorage.getItem("task")) || [];
  let object = createTaskObject(
    taskName,
    taskDescription,
    PrioritySelection,
    dateInput
  );
  taskArr.push(object);
  localStorage.setItem("task", JSON.stringify(taskArr));
  displayTheData(getLocalStorage("task"), todolistSectionUl);
});
const createTaskObject = (name, description, priority, date) => {
  const task = {
    id: Date.now(),
    name: name,
    description: description,
    priority: priority,
    date: date,
  };
  return task;
};
const getLocalStorage = (name) => {
  const getArr = localStorage.getItem(`${name}`);
  const object = JSON.parse(getArr);
  return object;
};
const displayTheData = (storagedata, element) => {
  element.innerHTML = "";
  storagedata.forEach((data) => {
    let { id, name } = data;

    let li = document.createElement("li");
    let h1 = document.createElement("h1");
    let p = document.createElement("p");
    let p2 = document.createElement("p");
    if (data.priority === "Low") {
      li.classList.add("border", "border-green-500");
    } else if (data.priority === "Medium") {
      li.classList.add("border", "border-yellow-500");
    } else if (data.priority === "High") {
      li.classList.add("border", "border-red-500");
    }
    li.classList.add("flex", "flex-col", "items-center");
    h1.innerHTML = data.name;
    p.innerHTML = data.description;
    p2.innerHTML = data.date;
    li.addEventListener("click", () => {
      taskNameTitle.innerHTML = name;
      editContainer.classList.remove("hidden");
      taskId = id;
      console.log(id);
    });
    li.appendChild(h1);
    li.appendChild(p);
    li.appendChild(p2);
    element.appendChild(li);
  });
};
updateBTN.addEventListener("click", () => {
    const changeStatus = document.getElementById("changeStatus").value;
    if(changeStatus==='In progress'){
        moveTaskToAnotherList(getLocalStorage("task"),"inProgressTasks",taskId);
        displayTheData(getLocalStorage("inProgressTasks"),progressSectionUl);
        removeObject(getLocalStorage("task"),taskId);
        editContainer.classList.add("hidden");
    }
    if(changeStatus==='Completed')
    {
        moveTaskToAnotherList(getLocalStorage("task"),"completed",taskId);
        displayTheData(getLocalStorage("completed"),completedsectionUl);
        removeObject(getLocalStorage("task"),taskId);
        editContainer.classList.add("hidden");
    }
    
  editData(getLocalStorage("task"), taskId);
  displayTheData(getLocalStorage("task"), todolistSectionUl);
});
removeBTN.addEventListener("click", () => {
    displayTheData(getLocalStorage("task"), todolistSectionUl);
    removeObject(getLocalStorage("task"), taskId);
  console.log(taskId);
});
const moveTaskToAnotherList = (data, storageName, taskId) => {
  let taskToMove = data.find((task) => task.id === taskId);
  if (taskToMove) {
    let anotherArr = [];
    anotherArr.push(taskToMove);
    let { name, description, priority, date } = anotherArr[0];
    let taskArr = JSON.parse(localStorage.getItem(`${storageName}`)) || [];
    let obj = createTaskObject(name, description, priority, date);
    taskArr.push(obj);
    localStorage.setItem(`${storageName}`, JSON.stringify(taskArr));
  }
};

displayTheData(getLocalStorage("task"), todolistSectionUl);
export { getLocalStorage };
