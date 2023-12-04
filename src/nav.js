
import * as myProjects from "./projects.js"

const projectSelect = document.querySelector("#project-select");
const projectsNav = document.querySelector(".projects-nav");
const usernameInput = document.querySelector("#username");
const newProjectBtn = document.querySelector(".new-project");

export function displayProjects(){
    myProjects.myProjects.map(project => {
        let projectId = `P${myProjects.myProjects.indexOf(project)}`;
        if(!(projectsNav.querySelector(`#P${projectId}`))){
            let projectTitle = document.createElement("h5");
            projectTitle.textContent = project.title;
            projectTitle.classList.add("project-title");
            projectTitle.setAttribute("id", `P${projectId}`);
            addProjectToSelect(project.title);
            projectsNav.append(projectTitle);
            console.log(myProjects.myProjects)
        }
    })
}

function addProjectToSelect(projectTitle){
        projectSelect.innerHTML += `<option value=${projectTitle}>${projectTitle}</option>`
}

export function changeUsername(){
    usernameInput.removeAttribute("disabled")
}

export function createConfirmCancelUsernameBtns(){
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

export function confirmCancelUsernameChange(eTarget){
    usernameInput.disabled = true;
    eTarget.parentElement.remove()
}

export function changeNewProjectButtonToInput(){
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

export function createNewProject(){
    let input = document.querySelector(".new-project-input");
    if(input.value.length > 0){
        myProjects.pushProject(input.value);
    }
}

export function toggleNewProject(){
    let input = document.querySelector(".new-project-div");
    input.remove();
    newProjectBtn.hidden = false;
}