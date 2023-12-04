import "./styles.css";

import * as projectPage from "./projecttodospage.js";
import * as mainPage from "./mainpage.js";
import * as navBar from "./nav.js";
import * as manageProjectsPage from "./manageProjectsPage.js"

const nav = document.querySelector("nav")

const changeUsernameBtn = document.querySelector(".change-username-btn");
const homePageBtn = document.querySelector(".home-nav");

const newProjectBtn = document.querySelector(".new-project");
const todoSendBtn = document.querySelector(".todo-send-btn");
let toDoListContainer = document.querySelector(".todo-list")
let homePage = document.querySelector(".home-page")
let addToDoForm = document.querySelector("form");
let toDoList = document.querySelectorAll("li");


function turnHomePage(){
    if(homePage.querySelector(".project-page-title")){
        homePage.querySelector(".project-page-title").remove();
    } else if(homePage.querySelector(".manage-project-page-title")){
        homePage.querySelector(".manage-project-page-title").remove();
    }
    if(homePage.querySelector(".project-list")){
        homePage.querySelector(".project-list").remove();
    }
    addToDoForm.hidden = false;
    if(toDoListContainer.hasAttribute("style")){
        toDoListContainer.removeAttribute("style")
    }
    mainPage.displayToDos();
    for(let i = 0; i < toDoList.length; i++){
        if(toDoList[i].hasAttribute("style")){
            toDoList[i].removeAttribute("style")
        }
    }
}

function turnManageProjectsPage(){
    if(homePage.querySelector(".project-page-title")){
        homePage.querySelector(".project-page-title").remove();
    }
    addToDoForm.hidden = true;
    if(!(homePage.querySelector(".project-list"))){
        manageProjectsPage.addMyProjectsTitle();
        manageProjectsPage.createProjectsDiv();
        manageProjectsPage.hideToDos();
        manageProjectsPage.displayProjects();
    }
    
}

changeUsernameBtn.addEventListener("click", () => {
    navBar.changeUsername();
    navBar.createConfirmCancelUsernameBtns();
    changeUsernameBtn.hidden = true;
});

nav.addEventListener("click", (e) => {
    if(e.target.matches(".confirmButton") || e.target.matches(".cancelButton")){
        navBar.confirmCancelUsernameChange(e.target);
        changeUsernameBtn.hidden = false;
}});

homePageBtn.addEventListener("click", () => {
    const homePage = document.querySelector(".home-page")
    homePage.hidden = false;
})

newProjectBtn.addEventListener("click", () => {
    navBar.changeNewProjectButtonToInput();
})

todoSendBtn.addEventListener("click", (e) => {
    e.preventDefault();
    mainPage.addToDo();
    mainPage.displayToDos();
});

document.addEventListener("DOMContentLoaded", (e) => {
    mainPage.displayToDos();
    navBar.displayProjects();
});

document.addEventListener("click", (e) => {
    const deleteBtn = e.target.closest(".delete-todo");
    const confirmNewProjectBtn = e.target.closest(".confirm-new-project");
    const editBtn = e.target.closest(".edit-todo");
    const homePageBtn = e.target.closest(".home-nav");
    const manageProjectsBtn = e.target.closest(".manage-projects-btn")
    const projectTitleBtn = e.target.closest(".project-title");
    const editProject = e.target.closest(".edit-project");

    if(deleteBtn){
        mainPage.deleteToDo(e);
    }
    if(confirmNewProjectBtn){
        navBar.createNewProject();
        navBar.displayProjects();
        navBar.toggleNewProject();
    }
    if(editBtn){
        mainPage.editToDo(e);
    }

    if(homePageBtn){
        turnHomePage();
    }

    if(manageProjectsBtn){
        turnManageProjectsPage();
    }
    if(projectTitleBtn){
        projectPage.changeAddToDoToProjectTitle(e.target.textContent);
        projectPage.deleteNonProjectToDos(e.target.textContent)
    }
    if(editProject){
        manageProjectsPage.editProject(e);
    }
})
