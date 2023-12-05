import * as myProjects from "./projects.js";
import * as nav from "./nav.js";
import { projects } from "./index.js";


let homePage = document.querySelector(".home-page")

export function addMyProjectsTitle(){
    let projectTitleDiv = document.createElement("div");
    projectTitleDiv.classList.add("manage-project-page-title")
    projectTitleDiv.textContent = "My Projects";
    homePage.insertBefore(projectTitleDiv, homePage.querySelector(".todo-list"))
}

export function hideToDos(){
    let toDoList = document.querySelector("ul");
    toDoList.style.display = "none";
}

export function createProjectsDiv(){
    let projectsList = document.createElement("ul")
    projectsList.classList.add("project-list");
    homePage.appendChild(projectsList)
}

export function displayProjects(){
    let projectsList = document.querySelector(".project-list");
    projects.map(project => {
        let projectId = projects.indexOf(project)
        if(!(projectsList.querySelector(`P${projectId}`))){
            let projectLi = document.createElement("li");
            projectLi.setAttribute("id", `P${projectId}`);
            let projectTitle = document.createElement("h4");
            projectTitle.classList.add("projectTitle")
            projectTitle.textContent = project.title;

            let projectBtns = document.createElement("div");
            projectBtns.classList.add("project-buttons-div")

            let editBtn = document.createElement("div");
            editBtn.classList.add("edit-project");
            editBtn.classList.add("material-icons");
            editBtn.textContent = "edit";

            
            let deleteBtn = document.createElement("div");
            deleteBtn.classList.add("delete-project");
            deleteBtn.classList.add("material-icons");
            deleteBtn.textContent = "delete"

            projectLi.appendChild(projectTitle);
            projectBtns.appendChild(editBtn);
            projectBtns.appendChild(deleteBtn);
            projectLi.appendChild(projectBtns);
            projectsList.appendChild(projectLi);
            
        }
        
    })
}

function changeProjectTitleToInput(e){
    let parentProject = e.target.parentElement.parentElement
    let projectTitle = parentProject.querySelector(".projectTitle");
    projectTitle.hidden = true;
    let projectTitleInput = document.createElement("input");
    projectTitleInput.setAttribute("value", projectTitle.textContent);
    projectTitleInput.setAttribute("id", "editProjectTitle");
    parentProject.insertBefore(projectTitleInput, parentProject.querySelector(".project-buttons-div"))
}

function changeProjectButtons(e){
    let parentToDo = e.target.parentElement.parentElement
    let buttonsDiv = parentToDo.querySelector(".project-buttons-div");
    let editButton = e.target;
    editButton.style.display = "none";
    let confirmButton = document.createElement("div");
    confirmButton.classList.add("confirm-change-project");
    confirmButton.classList.add("material-icons");

    let deleteButton = e.target.nextSibling;
    deleteButton.style.display = "none";

    let cancelButton = document.createElement("div");
    cancelButton.classList.add("cancel-change-project");
    cancelButton.classList.add("material-icons");
    
    confirmButton.textContent = "check";
    cancelButton.textContent = "close";

    buttonsDiv.appendChild(confirmButton);
    buttonsDiv.appendChild(cancelButton);
}

function finishChangesButtons(parentToDo){
    const confirmBtn = parentToDo.querySelector(".confirm-change-project");
    const editBtn = parentToDo.querySelector(".edit-project");
    const cancelBtn = parentToDo.querySelector(".cancel-change-project")
    const deleteBtn = parentToDo.querySelector(".delete-project");
    const projectTitleInput = parentToDo.querySelector("#editProjectTitle");

    confirmBtn.remove();
    cancelBtn.remove();
    
    editBtn.removeAttribute("style");
    deleteBtn.removeAttribute("style")
    projectTitleInput.remove();
}

export function deleteProject(e){
    const li = document.querySelectorAll("li");
    projects.splice((e.target.parentElement.parentElement.id).split("")[1], 1);
    e.target.parentElement.parentElement.remove();
    let currIndex = 0;
    li.forEach(ul => {
        if(ul.id.split("")[1] != e.target.parentElement.parentElement.id.split("")[1] && !(ul.hasAttribute("style"))){
            currIndex++;
            let currID = `P${projects.length - (projects.length - currIndex + 1)}`
            ul.setAttribute("id", currID)
        }
    })
    nav.deleteProject(e);
}

export function editProject(e){
    let parentToDo = e.target.parentElement.parentElement
    changeProjectTitleToInput(e);
    changeProjectButtons(e);
    parentToDo.addEventListener("click", event => {
        
        const cancelProject = event.target.closest(".cancel-change-project");
        const confirmButton = event.target.closest(".confirm-change-project");
        let projectTitle = e.target.parentElement.parentElement.querySelector(".projectTitle");

        if(confirmButton){
            
            let projectIndex = e.target.parentElement.parentElement.id.split("")[1]
            projects[projectIndex].title = e.target.parentElement.parentElement.querySelector("#editProjectTitle").value;
            projectTitle.textContent = projects[projectIndex].title;
            projectTitle.hidden = false;
            finishChangesButtons(parentToDo)
        }
        if(cancelProject){
            projectTitle.hidden = false;
            finishChangesButtons(parentToDo)
        }
    })
}
