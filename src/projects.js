
export const myProjects = [{
    title: 'Default'
}];

export function createProject(title){
    return{ title }
}

export function pushProject(title){
    myProjects.push(createProject(title))
};
