//caputure input from taskName taskDescription and priority
//push up the data to local storage
//get the local storage
//create a function to display the data
//
import { editData, removeObject } from "./editList.js";
const submitButton = document.getElementById("submit-task");
let todolistSectionUl = document.getElementById("ToDoUL");
const progressSectionUl = document.getElementById("In-Progress-List-UL");
const completedsectionUl = document.getElementById("Completed-List-UL");
const editContainer = document.getElementById("edit-container");
const updateBTN = document.getElementById("update");
const removeBTN = document.getElementById("remove");
const changeStatus = document.getElementById("changeStatus").value;

let taskId;


submitButton.addEventListener("click", () => {
  const taskName = document.getElementById("Task-Name").value;
  const taskDescription = document.getElementById("Task-Description").value;
  const PrioritySelection = document.getElementById("Priority-Selection").value;
  const dateInput = document.getElementById("calender-input").value;
  let taskArr = JSON.parse(localStorage.getItem("task")) || [];
  let object = createTaskObject(taskName,taskDescription,PrioritySelection,dateInput);
  taskArr.push(object);
  localStorage.setItem("task", JSON.stringify(taskArr));

  displayTheData();
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
const getLocalStorage = () => {
  const getArr = localStorage.getItem("task");
  const object = JSON.parse(getArr);
  return object;
};
const displayTheData = () => {
  const getArr = getLocalStorage();
  todolistSectionUl.innerHTML = ''
  getArr.forEach((data) => {
    let{id}=data
    taskId=id
    
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
      editContainer.classList.remove("hidden");
        
    });
   
    li.appendChild(h1);
    li.appendChild(p);
    li.appendChild(p2);
    todolistSectionUl.appendChild(li);
  });
};
updateBTN.addEventListener("click",()=>{

    editData(getLocalStorage(),taskId)
    
})

displayTheData();
export { getLocalStorage };
