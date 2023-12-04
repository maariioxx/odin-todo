import "./styles.css";
import * as toDos from "./todos.js";
import * as myProjects from "./projects.js"
import * as dateFns from "date-fns";
import * as projectPage from "./projecttodos.js"

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
            dueDate.classList.add("toDoDueDate")
            dueDate.textContent = `${dateFns.format(new Date(todo.dueDate), 'dd-MM-yy')}`;
            console.log(toDos.myToDos)
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
    console.log(e.target)
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
}

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

function editToDo(e){
    const parentToDo = e.target.parentElement.parentElement
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
    if(input.value.length > 0){
        myProjects.pushProject(input.value);
    }
}

function toggleNewProject(){
    let input = document.querySelector(".new-project-div");
    input.remove();
    newProjectBtn.hidden = false;
}

function turnHomePage(){
    let homePage = document.querySelector(".home-page")
    let addToDoForm = document.querySelector("form");
    let toDoList = document.querySelectorAll("li");
    if(homePage.querySelector(".project-page-title")){
        homePage.querySelector(".project-page-title").remove();
    };
    addToDoForm.hidden = false;
    displayToDos();
    for(let i = 0; i < toDoList.length; i++){
        if(toDoList[i].hasAttribute("style")){
            toDoList[i].removeAttribute("style")
        }
    }
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

document.addEventListener("DOMContentLoaded", (e) => {
    displayToDos();
    displayProjects();
});

document.addEventListener("click", (e) => {
    const deleteBtn = e.target.closest(".delete-todo");
    const confirmNewProjectBtn = e.target.closest(".confirm-new-project");
    const editBtn = e.target.closest(".edit-todo");
    const homePageBtn = e.target.closest(".home-nav")
    const projectTitleBtn = e.target.closest(".project-title");

    if(deleteBtn){
        deleteToDo(e);
    }
    if(confirmNewProjectBtn){
        createNewProject();
        displayProjects();
        toggleNewProject();
    }
    if(editBtn){
        editToDo(e);
    }

    if(homePageBtn){
        turnHomePage();
    }

    if(projectTitleBtn){
        projectPage.changeAddToDoToProjectTitle(e.target.textContent);
        projectPage.deleteNonProjectToDos(e.target.textContent)
    }
})
