import "./styles.css";

import * as projectPage from "./projectToDosPage.js";
import * as mainPage from "./mainPage.js";
import * as navBar from "./nav.js";
import * as manageProjectsPage from "./manageProjectsPage.js"
import { myToDos } from "./todos";
import { myProjects } from "./projects";


const nav = document.querySelector("nav")
const changeUsernameBtn = document.querySelector(".change-username-btn");
const homePageBtn = document.querySelector(".home-nav");
const newProjectBtn = document.querySelector(".new-project");
const todoSendBtn = document.querySelector(".todo-send-btn");
let toDoListContainer = document.querySelector(".todo-list")
let homePage = document.querySelector(".home-page")
let addToDoForm = document.querySelector("form");
let toDoList = document.querySelectorAll("li");

let username = [];
console.log(localStorage.getItem("username"))
if(localStorage.getItem("username") === null){
    username = [{user : "user"}];
    localStorage.setItem("username", JSON.stringify(username))
} else {
    username = JSON.parse(localStorage.getItem("username"))
}

let todos = [];
if(localStorage.getItem("todos") === null){
    todos = [
        {
            title: "Go to the gym",
            dueDate: "2023-12-1",
            priority: "medium",
            project: "Default",
            id: 0
        },
        {
            title: "Go to the gym",
            dueDate: "2023-12-1",
            priority: "medium",
            project: "Default",
            id: 0
        },
        {
            title: "Go to the gym",
            dueDate: "2023-12-1",
            priority: "medium",
            project: "Default",
            id: 0
        },
        {
            title: "Go to the gym",
            dueDate: "2023-12-1",
            priority: "medium",
            project: "Default",
            id: 0
        },
        {
            title: "Go to the gym",
            dueDate: "2023-12-1",
            priority: "medium",
            project: "Default",
            id: 0
        },
        {
            title: "Go to the gym",
            dueDate: "2023-12-1",
            priority: "medium",
            project: "Default",
            id: 0
        }
    ]
    localStorage.setItem("todos", JSON.stringify(todos))
} else {
    todos = JSON.parse(localStorage.getItem("todos"))
}

let projects = [];
if(localStorage.getItem("projects") === null){
    projects = [{
        title : "Default"
    }]
    localStorage.setItem("projects", JSON.stringify(projects))
} else {
    projects = JSON.parse(localStorage.getItem("projects"))
}

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

export function updateUsernameLocalStorage(){
    localStorage.setItem("username", JSON.stringify(username))
}

export function updateToDosLocalStorage(){
    localStorage.setItem("todos", JSON.stringify(todos));
    
}

export function updateProjectsLocalStorage(){
    localStorage.setItem("projects", JSON.stringify(projects))
}

changeUsernameBtn.addEventListener("click", () => {
    navBar.changeUsername();
    navBar.createConfirmCancelUsernameBtns();
    changeUsernameBtn.hidden = true;
});

nav.addEventListener("click", (e) => {
    if(e.target.matches(".confirmButton") || e.target.matches(".cancelButton")){
        navBar.confirmCancelUsernameChange(e.target);
        updateUsernameLocalStorage();
        navBar.displayUsername();
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
    updateToDosLocalStorage();
    mainPage.displayToDos();
});

document.addEventListener("DOMContentLoaded", () => {
    mainPage.displayToDos();
    navBar.displayProjects();
    navBar.displayUsername();
});

document.addEventListener("click", (e) => {
    const deleteToDo = e.target.closest(".delete-todo");
    const deleteProject = e.target.closest(".delete-project")
    const confirmNewProjectBtn = e.target.closest(".confirm-new-project");
    const editBtn = e.target.closest(".edit-todo");
    const homePageBtn = e.target.closest(".home-nav");
    const manageProjectsBtn = e.target.closest(".manage-projects-btn")
    const projectTitleBtn = e.target.closest(".project-title");
    const editProject = e.target.closest(".edit-project");
    const confirmChangeTodo = e.target.closest(".confirm-change-todo");
    const confirmChangeProject = e.target.closest(".confirm-change-project");

    if(deleteToDo){
        mainPage.deleteToDo(e);
        updateToDosLocalStorage();
    }
    if(deleteProject){
        manageProjectsPage.deleteProject(e);
        updateProjectsLocalStorage();
    }
    if(confirmNewProjectBtn){
        navBar.createNewProject();
        updateProjectsLocalStorage();
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
        if(!(document.querySelector(".manage-project-page-title"))){
            projectPage.deleteNonProjectToDos(e.target.textContent)
        } else{
            document.querySelector(".manage-project-page-title").remove();
            document.querySelector(".project-list").remove();
        }
        
    }
    if(editProject){
        manageProjectsPage.editProject(e);
    }
    if(confirmChangeTodo){
        updateToDosLocalStorage();
    }
    if(confirmChangeProject){
        updateProjectsLocalStorage();
    }
})

export {username}
export {todos}
export {projects}
