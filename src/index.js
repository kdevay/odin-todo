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
    errorL: document.getElementById('listNameError'),
    errorP: document.getElementById('projNameError'),
    listCounter: 1,
    listForm: document.getElementById('newListForm'),
    listItemsOL: document.getElementById('formListItems'),
    modal: document.getElementById('modal'),
    modalShadow: document.getElementById('modalShadow'),
    projectForm: document.getElementById('newProjForm'),
    sidebar: document.getElementById('files'),
    
    fields: { 
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
        this.hide(this.errorL);
        this.hide(this.errorP);
        this.hide(this.modal);
        this.hide(this.modalShadow);
        this.hide(this.dropdownCont);
        this.hide(this.projectForm);
        this.hide(this.listForm);
        this.hide(this.fields.lProjectName);
    },
    clearForms() {
        page.listForm.reset();
        page.projectForm.reset();
    }
};

// functions ////////////////////////////////////////////////////////
const display = { // Display appropriate form
    shadow() {
        // Close all forms on shadow click
        page.hideAll();
        page.clearForms();
    },
    add() { // On 'plus' icon click,
        page.show(page.modalShadow); // Display modal shadow & dropdown buttons
        page.show(page.dropdownCont);
    },
    projectForm() { // On '+project' button click,
        // Display modal & hide dropdown buttons
        page.show(page.modal);
        page.show(page.modalShadow);
        page.hide(page.dropdownCont);
        page.show(page.projectForm); // Display Project form
    },
    listForm() { // On '+list' button click,
        // Display modal & hide dropdown buttons
        page.show(page.modal);
        page.show(page.modalShadow);
        page.hide(page.dropdownCont);
        page.show(page.listForm); // Display List form
    },
    projectFile(name) {
        // Create Div and heading elements
        let div = document.createElement('div');
        div.setAttribute('id', 'parent' + name);
        let project = document.createElement('h3');
        project.textContent = name;
        project.setAttribute('id', name);
        // Add elements to dom
        page.sidebar.appendChild(div);
        div.appendChild(project);
    },
    listFile(listName, projectName) {
        // Logic for un-selected project Name
        projectName ? projectName = projectName : projectName = 'Miscellaneous';
        // Create p element
        let list = document.createElement('p');
        list.textContent = listName;
        list.setAttribute('id', listName);
        // Get parent element
        let parent = document.getElementById('parent' + projectName);
        parent.appendChild(list)
    }
    // else if (click edit)
        // load list tile into form areas
        // display edit form
};


const validate = {
    name(name, array, formType, datumType) {
        let errorMessage;
        console.log('formType', formType);
        formType === 'list' ? errorMessage = page.errorL : errorMessage = page.errorP;
        console.log('page.errorL:', page.errorL);
        console.log('page.errorP:', page.errorP);
        console.log('errorMessage:', errorMessage);
        if (name === '') { // Field is empty
            errorMessage.style.display = 'block';
            errorMessage.textContent = 'ERROR: ' + datumType + ' name must contain 1 or more characters.';
            return false;
        }
        for (let i = 0; i < array.length; i++){
            if (array[i].name.toLowerCase()  === name.toLowerCase()) { // Name is not unique
                errorMessage.style.display = 'block';
                errorMessage.textContent = 'ERROR: A ' + datumType + ' with the name \"' + name + '\" already exists.';
                return false;
            }
        }
        return true;
    },
};


const addNew = {
    stopSub(e) {
    // Prevent form submission
    e.preventDefault();
    },

    //  Add List item
    listItem(e) {
        addNew.stopSub(e);
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
        addNew.stopSub(e);
        // Show project name field 
        if (e.target.options[e.target.selectedIndex].text === 'New project'){
            page.show(page.fields.lProjectName);
            page.hide(page.buttons.selectProjects);
        }
    },

    // add new project name to dropdown menu:  
    dropProj(name){
        let parent = page.fields.projDropdown; // Dropdown parent container
        let temp = document.createElement('option');
        temp.setAttribute('class', 'addedProject');
        temp.setAttribute('value', name);
        temp.textContent = name;
        parent.appendChild(temp);
    },

    project(e) {
        addNew.stopSub(e);
        console.log('entered project form');
        // Get Project name 
        let projectName = page.fields.projectName.value;

        // Make sure project name is unique & is not empty 
        if (!validate.name(projectName, projects, 'project', 'project')){
            return false;
        }

        // Add project to dropdown form, projects array & update DOM
        addNew.dropProj(projectName)
        projects.push(new Project (projectName, []));
        display.projectFile(projectName);
        page.hideAll();
        page.clearForms();
    },

    list(e) {
        console.log('entered LIST form');
        addNew.stopSub(e);
        // Get list data from DOM
        let listName = page.fields.listName.value;
        let dueDate = page.fields.dueDate.value;
        let elements = document.getElementsByClassName('formItem');
        let items = []; 
        let parentProject;
        let priority;
        let projectName;

        // Get parent project's name
        if (window.getComputedStyle(page.fields.lProjectName).display === 'flex'){
            // If adding project within '+list' form
            projectName = page.fields.lProjectName.value;
            // Validate project name
            //                  (name, array, formType, datumType)
            if (!validate.name(projectName, projects, 'list', 'project')){
                return;
            }
            // Add new project to dropdown form, projects array & update DOM
            addNew.dropProj(projectName)
            projects.push(new Project (projectName, []));
            projectFile(projectName); 

        } else { // Get project value from dropdown menu
            for (let i = 0; i < page.fields.projDropdown.length; i++) {
                if (page.fields.projDropdown[i].selected === true) { 
                    projectName = page.fields.projDropdown[i].value;
                }
            }
            // If nothing selected, default to miscellaneous 
            !projectName ? projectName = 'Miscellaneous' : projectName = projectName;
        }

        // Find project with this name
        for (let i = 0; i < projects.length; i++) {
            console.log('projects[i].name:', projects[i].name);
            console.log('projectName:', projectName);
            if (projects[i].name === projectName) { 
                parentProject = projects[i];
            }
        }
        console.log("parentProject", parentProject);
        // validate listName name(name, formType, datumType)
        if (!validate.name(listName, parentProject.lists, 'list', 'list')){ // failed
            return;
        } 

        // Get list array values from list elements array
        for (let i = 0; i < elements.length; i++) { 
            items.push(elements[i].value);
        }
        // Get priority value from dropdown
        for (let i = 0; i < page.fields.priority.length; i++) {
            if (page.fields.priority[i].selected === true) { 
                priority = page.fields.priority[i].value;
            }
        }
        priority === '' ? priority = 'normal' : priority = priority;
        
        // Construct new list & add to parent project
        let list = new List (listName, dueDate, priority, items);
        parentProject.lists.push(list);

        // Add list to DOM & reset list counter
        display.listFile(listName, projectName)
        page.listCounter = 1;
        // Replace dropdown element & reset to default view
        page.show(page.buttons.selectProjects);
        page.clearForms();
        page.hideAll();
    }
};


// Events ////////////////////////////////////////////////////////
page.modalShadow.addEventListener('click', display.shadow);
page.buttons.add.addEventListener('click', display.add);
page.buttons.displayPForm.addEventListener('click', display.projectForm);
page.buttons.displayLForm.addEventListener('click', display.listForm);
page.buttons.addItems.addEventListener('click', addNew.listItem);
page.buttons.addList.addEventListener('click', addNew.list);
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