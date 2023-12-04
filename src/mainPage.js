import * as toDos from "./todos.js"
import * as dateFns from "date-fns";

const toDoList = document.querySelector(".todo-list");


export function displayToDos(){
    toDos.myToDos.map(todo => {
        let toDoId = toDos.myToDos.indexOf(todo)
        if(!(toDoList.querySelector(`#TD${toDoId}`))){
            let todoLi = document.createElement("li");
            todoLi.setAttribute("id", `TD${toDoId}`);
            let toDoTitle = document.createElement("h4");
            toDoTitle.classList.add("toDoTitle");
            toDoTitle.textContent = `${todo.title}`;
            let dueDate = document.createElement("p");
            dueDate.classList.add("toDoDueDate")
            dueDate.textContent = `${dateFns.format(new Date(todo.dueDate), 'dd-MM-yy')}`;
            let priority = document.createElement("div");
            priority.classList.add("priority");
            priority.setAttribute("id", `${todo.priority}-priority`);
            let project = document.createElement("p");
            project.classList.add("toDoProject")
            project.textContent = todo.project;
            let todoBtns = document.createElement("div");
            todoBtns.classList.add("todo-buttons-div")
            let editBtn = document.createElement("div");
            editBtn.classList.add("edit-todo");
            editBtn.classList.add("material-icons");
            editBtn.textContent = "edit";
            let deleteBtn = document.createElement("div");
            deleteBtn.classList.add("delete-todo");
            deleteBtn.classList.add("material-icons");
            deleteBtn.textContent = "delete"
            
            todoLi.appendChild(toDoTitle);
            todoLi.appendChild(dueDate);
            todoLi.appendChild(priority);
            todoLi.appendChild(project);
            todoBtns.appendChild(editBtn);
            todoBtns.appendChild(deleteBtn);
            todoLi.appendChild(todoBtns);
            toDoList.appendChild(todoLi);
        }
    })
};

function changeToDoTitleToInput(parentToDo, editDiv){
    let toDoTitle = parentToDo.querySelector(".toDoTitle");
    toDoTitle.hidden = true;
    let toDoTitleInput = document.createElement("input");
    toDoTitleInput.setAttribute("value", toDoTitle.textContent);
    toDoTitleInput.setAttribute("id", "editToDoTitle")
    editDiv.appendChild(toDoTitleInput);
}
function changeToDoDueDateToInput(parentToDo, editDiv){
    let toDoDueDate = parentToDo.querySelector(".toDoDueDate")
    toDoDueDate.hidden = true;
    let toDoDueDateInput = document.createElement("input");
    toDoDueDateInput.setAttribute("type", "date")
    toDoDueDateInput.setAttribute("value", toDoDueDate.textContent);
    toDoDueDateInput.setAttribute("id", "editToDoDueDate")
    editDiv.appendChild(toDoDueDateInput);
}
function changeToDoPriorityToInput(parentToDo){
    let toDoPriority = parentToDo.querySelector(".priority");
    toDoPriority.style.cursor = "pointer";
    parentToDo.addEventListener("click", (e) => {
        let toDoPriorityChange = e.target.closest(".priority");
        if(toDoPriorityChange){
            let selectedPriority = toDoPriority.id.split("-")[0]
            if(selectedPriority === "high"){
                toDoPriority.id = "medium-priority"
            } else if (selectedPriority === "medium"){
                toDoPriority.id = "low-priority"
            } else {
                toDoPriority.id = "high-priority"
            }
        }
    });
}
function changeToDoButtons(parentToDo, e){
    let buttonsDiv = parentToDo.querySelector(".todo-buttons-div");
    let editButton = e.target;
    editButton.style.display = "none";
    let confirmButton = document.createElement("div");
    confirmButton.classList.add("confirm-change-todo");
    confirmButton.classList.add("material-icons");

    let deleteButton = e.target.nextSibling;
    deleteButton.style.display = "none";

    let cancelButton = document.createElement("div");
    cancelButton.classList.add("cancel-change-todo");
    cancelButton.classList.add("material-icons");
    
    confirmButton.textContent = "check";
    cancelButton.textContent = "close";

    buttonsDiv.appendChild(confirmButton);
    buttonsDiv.appendChild(cancelButton);
};

function changeToDoInfoToInputs(parentToDo, e){
    let editDiv = document.createElement("div");
    editDiv.classList.add("edit-div");
    changeToDoTitleToInput(parentToDo, editDiv);
    changeToDoDueDateToInput(parentToDo, editDiv);
    parentToDo.insertBefore(editDiv, parentToDo.querySelector(".priority"))
    changeToDoPriorityToInput(parentToDo);
    changeToDoButtons(parentToDo, e);
}

function finishChangesButtons(parentToDo){
    const confirmBtn = parentToDo.querySelector(".confirm-change-todo");
    const editBtn = parentToDo.querySelector(".edit-todo");
    const cancelBtn = parentToDo.querySelector(".cancel-change-todo")
    const deleteBtn = parentToDo.querySelector(".delete-todo");
    const editDiv = parentToDo.querySelector(".edit-div");

    confirmBtn.remove();
    cancelBtn.remove();
    
    editBtn.removeAttribute("style");
    deleteBtn.removeAttribute("style")
    editDiv.remove();
}

export function editToDo(e){
    const parentToDo = e.target.parentElement.parentElement
    console.log(parentToDo)
    changeToDoInfoToInputs(parentToDo, e);
    parentToDo.addEventListener("click", (event) => {
    const confirmButton = event.target.closest(".confirm-change-todo")
    const cancelButton = event.target.closest(".cancel-change-todo");

    const toDoTitle = parentToDo.querySelector(".toDoTitle");
    const toDoDueDate = parentToDo.querySelector(".toDoDueDate");
    
    if(confirmButton){
        const toDoIndex = parentToDo.id.split("")[2];
        toDos.myToDos[toDoIndex].title = parentToDo.querySelector("#editToDoTitle").value;
        toDoTitle.textContent = toDos.myToDos[toDoIndex].title;
        toDoTitle.hidden = false;
        toDos.myToDos[toDoIndex].dueDate = parentToDo.querySelector("#editToDoDueDate").value;
        toDoDueDate.textContent = dateFns.format(new Date(toDos.myToDos[toDoIndex].dueDate), 'dd-MM-yy');
        toDoDueDate.hidden = false;
        toDos.myToDos[toDoIndex].priority = parentToDo.querySelector(".priority").id.split("-")[0];
        finishChangesButtons(parentToDo);
        
    }

    if(cancelButton){
        toDoTitle.hidden = false;
        toDoDueDate.hidden = false;
        finishChangesButtons(parentToDo);
    }
    })
}

export function addToDo(){
    let toDoTitleInput = document.querySelector("#toDoTitle").value
    let dateInput = document.querySelector("#dueDate").value
    let priorityInput = document.querySelector("input[type = 'radio']:checked").value;
    let projectInput = document.querySelector("#project-select").value;
    let toDoId = toDos.myToDos.length;
    toDos.pushToDo(toDoTitleInput, dateInput, priorityInput, projectInput, toDoId);
};

export function deleteToDo(e){
    const li = document.querySelectorAll("li");
    const index = toDos.myToDos[(e.target.parentNode.id).split("")[2]];
    toDos.myToDos.splice(index, 1);
    e.target.parentElement.parentElement.remove();
    let currIndex = 0;
    li.forEach(ul => {
        if(ul.id.split("")[2] != e.target.parentElement.parentElement.id.split("")[2]){
            currIndex++;
            let currID = `TD${toDos.myToDos.length - (toDos.myToDos.length - currIndex + 1)}`
            ul.setAttribute("id", currID)
        }
    })
};