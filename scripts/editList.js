//retrieve the local storage data
import { getLocalStorage } from "./scripts.js";

const editData = (data, taskID) => {
  const changeStatus = document.getElementById("changeStatus").value;
  const editName = document.getElementById("editName").value,
    editDescription = document.getElementById("editDescription").value,
    editDate = document.getElementById("editDate").value,
    editPriority = document.getElementById("editPriority").value;
  let inputArr = [editName, editDescription, editDate, editPriority];
  for (let i = 0; i < inputArr.length; i++) {
    if (inputArr[i] === "") {
    }
  }
  let taskIndex = data.findIndex((d) => d.id === taskID);
  if (taskIndex !== -1) {
    data[taskIndex].name = editName !== "" ? editName : data[taskIndex].name;
    data[taskIndex].description =
      editDescription !== "" ? editDescription : data[taskIndex].description;
    data[taskIndex].priority =
      editPriority !== "" ? editPriority : data[taskIndex].priority;
    data[taskIndex].date = editDate !== "" ? editDate : data[taskIndex].date;
    localStorage.setItem("task", JSON.stringify(data));
    console.log(data);
  }
};
//make a function to remove task from local storage
const removeObject = (data, taskID) => {
  const updatedData = data.filter((task) => task.id !== taskID);
  localStorage.setItem("task", JSON.stringify(updatedData));
};

export { editData, removeObject };
