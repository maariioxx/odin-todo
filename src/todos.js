export const myToDos = [{
    title: "Go to the gym",
    dueDate: "2/12/2023",
    priority: "high",
    project: "default"
}];

export const myProjects = [{
    title: 'default'
}];

export function createToDo (title, dueDate, priority, project){
    return{ title, dueDate, priority, project}
};

export function createProject(title){
    return{ title }
}

export function pushToDo(title, dueDate, priority, project){
    myToDos.push(createToDo(title, dueDate, priority, project))
}

export function pushProject(title){
    myProjects.push(createProject(title))
};
