export const myToDos = [{
    title: "Go to the gym",
    description: "Push day",
    dueDate: "2/12/2023",
    priority: "high",
    project: "default"
}];

export const myProjects = [{
    title: 'default'
}];

export function createToDo (title, description, dueDate, priority, project){
    return{ title, description, dueDate, priority, project}
};

export function createProject(title){
    return{ title }
}

export function pushToDo(title, description, dueDate, priority, project){
    myToDos.push(createToDo(title, description, dueDate, priority, project))
}

export function pushProject(title){
    myProjects.push(createProject(title))
};
