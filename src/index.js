import './style.css';
import './normalize.css';
import Add from './add.png';
import Dots from './dots.png';

// projects
const projects = [];
class Project { 
    constructor (name, lists) {
    this.name = name;
    this.lists = lists;
}};

class List {
    constructor (name, dueDate, priority, items) {    
    this.name = name;
    this.dueDate = dueDate;
    this.priority = priority;
    this.items = items;
}};

// Add '+' icon
const addIcon = document.createElement('img'); // Add new list/project
addIcon.setAttribute('class', 'icon');
addIcon.setAttribute('id', 'plus');
addIcon.setAttribute('src', Add);
document.getElementById('icon-cont').appendChild(addIcon);

// All buttons and containers in page
const page = { 
    dropdownCont: document.getElementById('addButtons'),
    listCounter: 1,
    listForm: document.getElementById('newListForm'),
    listItemsOL: document.getElementById('formListItems'),
    modal: document.getElementById('modal'),
    modalShadow: document.getElementById('modalShadow'),
    projectForm: document.getElementById('newProjForm'),
    sidebar: document.getElementById('files'),
    
    field: { 
        projDropdown: document.getElementById('allProjects'),
        listName: document.getElementById('listName'),
        priority: document.getElementById('priority'),
        dueDate: document.getElementById('dueDate'),
        lProjectName: document.getElementById('lFormProjName'),
        projectName: document.getElementById('projName'),
    },
    buttons: { 
        add: addIcon,
        displayPForm: document.getElementById('displayProjectForm'),
        displayLForm: document.getElementById('displayListForm'),
        addItems: document.getElementById('addItems'),
        addList: document.getElementById('addList'),
        addProject: document.getElementById('addProject'),
        addLP: document.getElementById('listToNewProject'),
        selectProjects: document.getElementById('allProjects'),
    }, 
    show(element) {
        element.style.display = 'flex';
    },
    hide(element) {
        element.style.display =  'none';
    },
    hideAll() {
        this.hide(this.modal);
        this.hide(this.modalShadow);
        this.hide(this.dropdownCont);
        this.hide(this.projectForm);
        this.hide(this.listForm);
        this.hide(this.field.lProjectName);
    }
};

// functions ////////////////////////////////////////////////////////
const display = { // Display appropriate form
    shadow() {
        // Close all forms on shadow click
        page.hideAll();
    },
    add() { // On 'plus' icon click,
        page.show(page.modalShadow); // Display modal shadow & dropdown buttons
        page.show(page.dropdownCont);
    },
    listForm() { // On '+list' button click,
        // Display modal & hide dropdown buttons
        page.show(page.modal);
        page.show(page.modalShadow);
        page.hide(page.dropdownCont);
        // TODO: add all project names into dropdown menu:  
        let parent = page.field.projDropdown;
        for (let i = 0; i < projects.length; i++) {
            let temp = document.createElement('option');
            temp.setAttribute('value', projects[i].name);
            temp.textContent = projects[i].name;
            parent.appendChild(temp);
        }
        page.show(page.listForm); // Display List form
    },
    projectForm() { // On '+project' button click,
        // Display modal & hide dropdown buttons
        page.show(page.modal);
        page.show(page.modalShadow);
        page.hide(page.dropdownCont);
        page.show(page.projectForm); // Display Project form
    },
    projectFile(name) {
        // Create Div and heading elements
        let div = document.createElement('div');
        let project = document.createElement('h3');
        project.textContent = name;
        project.setAttribute('id', name);
        // Add elements to dom
        page.sidebar.appendChild(div);
        div.appendChild(project);
    },
    listFile(name, project) {
        // Create p element
        let list = document.createElement('p');
        project.textContent = name;
        project.setAttribute('id', name);
        // Get parent element
        let parent = document.getElementById(project);
        parent.appendChild(list)
    }
    // else if (click edit)
        // load list tile into form areas
        // display edit form
};

const addNew = {
    stopSub(e) {
    // Prevent form submission
    e.preventDefault();
    },

    //  Add List item
    listItem(e) {
        this.stopSub(e);
        // increment list counter
        page.listCounter++;
        // Add li and nested input to dom
        let tempLI = document.createElement('li');
        let tempInput = document.createElement('input');
        tempInput.setAttribute('class', 'formItem')
        tempInput.setAttribute('type', 'text')
        tempInput.setAttribute('id', 'listItem' + page.listCounter)
        tempLI.appendChild(tempInput);
        page.listItemsOL.appendChild(tempLI);
    },

    // Selected new project in new list form
    listProj(e) {
        // Show project name field 
        if (e.target.options[e.target.selectedIndex].text === 'New project'){
            page.show(page.field.lProjectName);
            page.hide(page.buttons.selectProjects);
        }
    },

    project() {
        // Add Project name to memory
        let projectName = page.field.lProjectName.value;
        projects[projectName] = new Project (projectName, []);
        display.projectFile(projectName);
    },

    list() {
        // Get list data from DOM
        let listName = page.field.listName.value;
        let dueDate = page.field.dueDate.value;
        let elements = document.getElementsByClassName('formItem');
        let items = []; 
        let priority;
        let projectName;
        // Get list array values from list elements array
        for (let i = 0; i < elements.length; i++) { 
            items.push(elements[i].value);
        }
        // Get priority value from select priority array
        for (let i = 0; i < page.field.priority.length; i++) {
            if (page.field.priority[i].selected === true) { 
                priority = page.field.priority[i].value;
            }
            if (priority === '') {
                priority = 'normal';
            }
        }
        // Construct new list
        let list = new List (listName, dueDate, priority, items);

        // If adding new project within list form
        if (window.getComputedStyle(page.field.lProjectName).display === 'flex'){
            // Create new project
            projectName = page.field.lProjectName.value;
            projects.push(new Project (projectName, []));
            projectFile(projectName); // Add project to DOM

        } else { // Get project value from select project array
            for (let i = 0; i < page.field.projDropdown.length; i++) {
                if (page.field.projDropdown[i].selected === true) { 
                    projectName = page.field.projDropdown[i].value;
                }
            }
        }
        // Add list to existing project
        let parentProject;
        for (let i = 0; i < projects.length; i++) {
            if (projects[i][projectName] === projectName) { 
                parentProject = projects[i];
            }
        }
        !parentProject ? console.log('error') : parentProject.lists.push(list);
        
        // Add list to DOM & reset list counter
        listFile(listName, projectName)
        page.listCounter = 1;
        // Replace dropdown element & hide form
        page.show(page.buttons.selectProjects);
        page.hideAll();
    }
}


// Events ////////////////////////////////////////////////////////
page.modalShadow.addEventListener('click', display.shadow);
page.buttons.add.addEventListener('click', display.add);
page.buttons.displayPForm.addEventListener('click', display.projectForm);
page.buttons.displayLForm.addEventListener('click', display.listForm);
page.buttons.addItems.addEventListener('click', addNew.listItem);
page.buttons.addList.addEventListener('click', addNew);
page.buttons.addProject.addEventListener('click', addNew.project);
page.buttons.selectProjects.addEventListener('change', addNew.listProj);

// Set Defaults
page.hideAll();



// function applyEdit(e) {
//     // update list item
// }
// Add form data to memory depending on button id

// function addItem(e) {
//     // get data id
//     // update value of button data id
//     // add new form area for another item
//     // use data id to set id of new form area
// }

// Add '...' icon to list tiles
// const tileTop = document.getElementById('tileTop'); // Change this to be an array of all lists
// const optionsIcon = document.createElement('img');
// optionsIcon.setAttribute('id', 'options');
// optionsIcon.setAttribute('class', 'icon');
// optionsIcon.setAttribute('src', Dots);
// tileTop.appendChild(optionsIcon);

// optionsIcon.addEventListener('click', displayForm);
// Store lists and projects in object
// const projects = {
//     projectName: {listName, listName2, listName3},
//     projectName2: {listName, listName2, listName3}
// }
// const listObject = {
//     priority: ('high', 'low', 'normal'),
//     dueDate: '1/2/33',
//     tasks: []
// }