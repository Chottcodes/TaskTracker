//retrieve the local storage data
const updateBTN = document.getElementById("update");
const removeBTN = document.getElementById("remove");
const changeStatus = document.getElementById("changeStatus").value;

const editData = (data, taskID) => {
  const editName = document.getElementById("editName").value,
    editDescription = document.getElementById("editDescription").value,
    editDate = document.getElementById("editDate").value,
    editPriority = document.getElementById("editPriority").value;
    let inputArr=[editName,editDescription,editDate,editPriority];
    // for(let i = 0;i<inputArr.length;i++){
    //     if(inputArr[i]==="")
    //     {

    //     }
    // }
  let taskIndex = data.findIndex((d) => d.id === taskID);
  if (taskIndex !== -1) {
    data[taskIndex].name = editName;
    data[taskIndex].description = editDescription;
    data[taskIndex].priority = editPriority;
    data[taskIndex].date = editDate;
    localStorage.setItem("task", JSON.stringify(data));
    console.log(data);
  }
};
//make a function to remove task from local storage
const removeObject = (data,taskID)=>{
    data.filter(data => data.id !== taskID )
    localStorage.setItem("task",JSON.stringify(data));
}
export { editData, removeObject };
