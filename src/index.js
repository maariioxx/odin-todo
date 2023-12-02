import "./styles.css";
import * as toDos from "./todos.js";
import * as myProjects from "./projects.js"
import * as dateFns from "date-fns";

const nav = document.querySelector("nav")
const usernameInput = document.querySelector("#username");
const changeUsernameBtn = document.querySelector(".change-username-btn");
const homePageBtn = document.querySelector(".home-nav");
const projectsNav = document.querySelector(".projects-nav");
const newProjectBtn = document.querySelector(".new-project");
const ul = document.querySelector("ul");
const todoSendBtn = document.querySelector(".todo-send-btn");
const projectSendBtn = document.querySelector(".project-send-btn");
const toDoList = document.querySelector(".todo-list");
const projectSelect = document.querySelector("#project-select");



function displayToDos(){
    toDos.myToDos.map(todo => {
        let toDoId = toDos.myToDos.indexOf(todo)
        if(!(ul.querySelector(`#TD${toDoId}`))){
            let todoLi = document.createElement("li");
            todoLi.setAttribute("id", `TD${toDoId}`);
            let toDoTitle = document.createElement("h4");
            toDoTitle.classList.add("toDoTitle");
            toDoTitle.textContent = `${todo.title}`;
            let dueDate = document.createElement("p");
            dueDate.textContent = `${dateFns.format(new Date(todo.dueDate), 'dd-MM-yy')}`;
            let priority = document.createElement("div");
            priority.classList.add("priority");
            priority.setAttribute("id", `${todo.priority}-priority`);
            let project = document.createElement("p");
            project.textContent = todo.project;
            let deleteBtn = document.createElement("div");
            deleteBtn.classList.add("delete-todo");
            deleteBtn.classList.add("material-icons");
            deleteBtn.textContent = "delete"
        
            todoLi.appendChild(toDoTitle);
            todoLi.appendChild(dueDate);
            todoLi.appendChild(priority);
            todoLi.appendChild(project);
            todoLi.appendChild(deleteBtn);

            toDoList.appendChild(todoLi);
        }
    })
}

function displayProjects(){
    myProjects.myProjects.map(project => {
        let projectId = `P${myProjects.myProjects.indexOf(project)}`;
        if(!(projectsNav.querySelector(`#P${projectId}`))){
            let projectTitle = document.createElement("h5");
            projectTitle.textContent = project.title;
            projectTitle.classList.add("project-title");
            projectTitle.setAttribute("id", `P${projectId}`);
            addProjectToSelect(project.title);
            projectsNav.append(projectTitle);
        }
        
    })
}

function addToDo(){
    let toDoTitleInput = document.querySelector("#toDoTitle").value
    let dateInput = document.querySelector("#dueDate").value
    let priorityInput = document.querySelector("input[type = 'radio']:checked").value;
    let projectInput = document.querySelector("#project-select").value;
    let toDoId = toDos.myToDos.length;
    console.log(dateInput)
    toDos.pushToDo(toDoTitleInput, dateInput, priorityInput, projectInput, toDoId);
};

function addProject(){
    let projectTitle = document.querySelector("#projectTitle").value;
    addProjectToSelect(projectTitle);
    myProjects.pushProject(projectTitle);
}

function addProjectToSelect(projectTitle){
        projectSelect.innerHTML += `<option value=${projectTitle}>${projectTitle}</option>`
}

function changeUsername(){
    usernameInput.removeAttribute("disabled")
}

function createConfirmCancelUsernameBtns(){
    let usernameDiv = document.querySelector(".welcome");
    if(!(usernameDiv.querySelector(".confirmButton"))){
        let buttonsDiv = document.createElement("div");
        let confirmButton = document.createElement("button");
        let cancelButton = document.createElement("button");
        confirmButton.classList.add("confirmButton");
        confirmButton.classList.add("material-icons");
        confirmButton.textContent = "check";
        cancelButton.classList.add("cancelButton");
        cancelButton.classList.add("material-icons");
        cancelButton.textContent = "close";
        buttonsDiv.appendChild(confirmButton);
        buttonsDiv.appendChild(cancelButton)
        usernameDiv.appendChild(buttonsDiv)
    }  
}

function confirmCancelUsernameChange(eTarget){
    usernameInput.disabled = true;
    eTarget.parentElement.remove()
}

function deleteToDo(e){
    const li = document.querySelectorAll("li");
    const index = toDos.myToDos[(e.target.parentNode.id).split("")[2]];
    toDos.myToDos.splice(index, 1);
    e.target.parentElement.remove();
    let currIndex = 0;
    li.forEach(ul => {
        if(ul.id.split("")[2] != e.target.parentNode.id.split("")[2]){
            currIndex++;
            let currID = `TD${toDos.myToDos.length - (toDos.myToDos.length - currIndex + 1)}`
            ul.setAttribute("id", currID)
        }
    })
};

function changeNewProjectButtonToInput(){
    newProjectBtn.hidden = true;
    let newProjectInput = document.createElement("div");
    newProjectInput.classList.add("new-project-div")
    let input = document.createElement("input");
    let confirm = document.createElement("span");
    confirm.classList.add("material-icons");
    confirm.classList.add("confirm-new-project");
    confirm.textContent = "check"
    input.classList.add("new-project-input");
    input.textContent = "aaaa"
    newProjectInput.appendChild(input)
    newProjectInput.appendChild(confirm);
    projectsNav.appendChild(newProjectInput)
}

function createNewProject(){
    let input = document.querySelector(".new-project-input");
    myProjects.pushProject(input.value);
    console.log(myProjects.myProjects)
}

function toggleNewProject(){
    let input = document.querySelector(".new-project-div");
    input.remove();
    newProjectBtn.hidden = false;
}

changeUsernameBtn.addEventListener("click", () => {
    changeUsername();
    createConfirmCancelUsernameBtns();
    changeUsernameBtn.hidden = true;
});

nav.addEventListener("click", (e) => {
    if(e.target.matches(".confirmButton") || e.target.matches(".cancelButton")){
        confirmCancelUsernameChange(e.target);
        changeUsernameBtn.hidden = false;
}});

homePageBtn.addEventListener("click", () => {
    const homePage = document.querySelector(".home-page")
    homePage.hidden = false;
})

newProjectBtn.addEventListener("click", () => {
    changeNewProjectButtonToInput();
})

todoSendBtn.addEventListener("click", (e) => {
    e.preventDefault();
    addToDo();
    displayToDos();
});

projectSendBtn.addEventListener("click", (e) => {
    e.preventDefault();
    addProject();
});

document.addEventListener("DOMContentLoaded", (e) => {
    displayToDos();
    displayProjects();
});

document.addEventListener("click", (e) => {
    const deleteBtn = e.target.closest(".delete-todo");
    const confirmNewProjectBtn = e.target.closest(".confirm-new-project")
    if(deleteBtn){
        deleteToDo(e);
    }
    if(confirmNewProjectBtn){
        createNewProject();
        displayProjects();
        toggleNewProject();
    }
})




