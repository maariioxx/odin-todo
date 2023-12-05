export const myToDos = [{
    title: "Go to the gym",
    dueDate: "2023-12-1",
    priority: "medium",
    project: "Default",
    id: 0
}];



export function createToDo (title, dueDate, priority, project, id){
    return{ title, dueDate, priority, project, id}
};

export function pushToDo(title, dueDate, priority, project){
    myToDos.push(createToDo(title, dueDate, priority, project));
}
