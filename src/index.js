import "./styles.css";
import * as toDos from "./todos.js";
import * as dateFns from "date-fns";

const newTodoBtn = document.querySelector(".newToDo-btn");
const newProjectBtn = document.querySelector(".newProject-btn")
const toDoDialog = document.querySelector(".toDoDialog");
const projectDialog = document.querySelector(".projectDialog");
const toDoInfoDialog = document.querySelector(".toDoInfoDialog");
const ul = document.querySelector("ul")
const todoSendBtn = document.querySelector(".todo-send-btn");
const projectSendBtn = document.querySelector(".project-send-btn");
const toDoList = document.querySelector(".todo-list");
const projectSelect = document.querySelector("#project-select")



function displayToDos(){
    toDos.myToDos.map(todo => {
        let toDoId = toDos.myToDos.indexOf(todo)
        if(!(ul.querySelector(`#TD${toDoId}`))){
            let todoLi = document.createElement("li");
            todoLi.setAttribute("id", `TD${toDoId}`);
            let toDoTitle = document.createElement("h4");
            toDoTitle.classList.add("toDoTitleBtn");
            toDoTitle.textContent = `${todo.title}`;
            let description = document.createElement("p");
            description.textContent = `${todo.description}`;
            let dueDate = document.createElement("p");
            dueDate.textContent = `${dateFns.format(new Date(todo.dueDate), 'dd-MM-yy')}`;
            let priority = document.createElement("p");
            priority.textContent = `${todo.priority}`;
        
            todoLi.appendChild(toDoTitle);
            todoLi.appendChild(description);
            todoLi.appendChild(dueDate);
            todoLi.appendChild(priority);

            toDoList.appendChild(todoLi);
        }
        
    })
}

function addToDo(){
    let toDoTitleInput = document.querySelector("#toDoTitle").value
    let descInput = document.querySelector("#description").value
    let dateInput = document.querySelector("#dueDate").value
    let priorityInput = document.querySelector("#priority").value;
    let projectInput = document.querySelector("#project-select").value;

    toDos.pushToDo(toDoTitleInput, descInput, dateInput, priorityInput, projectInput);
    console.log(toDos.myToDos)
};

function addProject(){
    let projectTitle = document.querySelector("#projectTitle").value;
    addProjectToSelect(projectTitle);
    toDos.pushProject(projectTitle);
}

function addProjectToSelect(projectTitle){
        projectSelect.innerHTML += `<option value=${projectTitle}>${projectTitle}</option>`
}

function changeInfoDialog(e){
    let infoTitle = document.querySelector(".dialogTitle");
    let infoDescription = document.querySelector(".dialogDescription");
    let infoDueDate = document.querySelector(".dialogDueDate");
    let infoPriority = document.querySelector(".dialogPriority");

    if(e.target && e.target.matches(".toDoTitleBtn")){
        let toDoId = e.target.parentNode.id.split("")[2];
        infoTitle.textContent = `${toDos.myToDos[toDoId].title}`;
        infoDescription.textContent = `${toDos.myToDos[toDoId].description}`;
        infoDueDate.textContent = `${toDos.myToDos[toDoId].dueDate}`;
        infoPriority.textContent = `${toDos.myToDos[toDoId].priority}`;
        toDoInfoDialog.showModal();
    }    
}

newTodoBtn.addEventListener("click", () => {
    toDoDialog.showModal();
});

newProjectBtn.addEventListener("click", () => {
    projectDialog.showModal()
})

todoSendBtn.addEventListener("click", (e) => {
    e.preventDefault();
    addToDo();
    displayToDos();
    toDoDialog.close();
});

projectSendBtn.addEventListener("click", (e) => {
    e.preventDefault();
    addProject();
    projectDialog.close();
});

document.addEventListener("DOMContentLoaded", () => {
    displayToDos();
})

ul.addEventListener("click", (e) => {
    changeInfoDialog(e)
})

