export const myToDos = [{
    title: "Go to the gym",
    dueDate: "2023-12-2",
    priority: "high",
    project: "default",
    id : 0
},
{
    title: "Go to the gym",
    dueDate: "2023-12-2",
    priority: "high",
    project: "default",
    id : 1
},
{
    title: "Go to the gym",
    dueDate: "2023-12-6",
    priority: "low",
    project: "default",
    id : 2
},
{
    title: "Go to the gym",
    dueDate: "2023-12-5",
    priority: "high",
    project: "default",
    id : 3
},
{
    title: "Go to the gym",
    dueDate: "2023-12-1",
    priority: "medium",
    project: "default",
    id : 4
},
{
    title: "Go to the gym",
    dueDate: "2023-12-3",
    priority: "high",
    project: "default",
    id : 5
}];



export function createToDo (title, dueDate, priority, project, id){
    return{ title, dueDate, priority, project, id}
};

export function pushToDo(title, dueDate, priority, project){
    myToDos.push(createToDo(title, dueDate, priority, project));
}
