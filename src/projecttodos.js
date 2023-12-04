import * as myProjects from './projects.js'

export function changeAddToDoToProjectTitle(project){
    let homePage = document.querySelector(".home-page")
    let addToDoForm = document.querySelector("form");
    addToDoForm.hidden = true;
    if(homePage.querySelector(".project-page-title")){
        homePage.querySelector(".project-page-title").remove();
    }

    let projectTitleDiv = document.createElement("div");
    projectTitleDiv.classList.add("project-page-title")
    projectTitleDiv.textContent = project;
    homePage.insertBefore(projectTitleDiv, homePage.querySelector(".todo-list"))
}

export function deleteNonProjectToDos(project){
    let toDoList = document.querySelectorAll("li");
    for(let i = 0; i < toDoList.length; i++){
        if(toDoList[i].querySelector(".toDoProject").textContent != project){
            toDoList[i].style.display = "none";
        } else if(toDoList[i].querySelector(".toDoProject").textContent === project){
            if(toDoList[i].hasAttribute("style")){
                toDoList[i].removeAttribute("style");
            }
        }
    }
}