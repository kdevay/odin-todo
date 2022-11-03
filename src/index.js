import './style.css';
import './normalize.css';
import Add from './add.png';
import Dots from './dots.png';

// projects
const projects = {};
class Project { 
    constructor (dueDate, lists) {
    this.dueDate = dueDate;
    this.lists = lists;
}};

class List {
    constructor (dueDate, priority, items) {    
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
    listCounter: 1,
    listItemsOL: document.getElementById('formListItems'),
    dropdownCont: document.getElementById('addButtons'),
    modal: document.getElementById('modal'),
    modalShadow: document.getElementById('modalShadow'),
    projectForm: document.getElementById('newProjForm'),
    listForm: document.getElementById('newListForm'),
    
    field: {
        projDropdown: document.getElementById('allProjects'),
        listName: document.getElementById('listName'),
        priority: document.getElementById('priority'),
        lDueDate: document.getElementById('lDueDate'),
        lProjectName: document.getElementById('lFormProjName'),
        projectName: document.getElementById('projName'),
        pDueDate: document.getElementById('pDueDate')
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
console.log(page.buttons.selectProjects);

// functions ////////////////////////////////////////////////////////
function displayForm(e) { // Display appropriate form based on button id
    const buttonId = e.target.getAttribute('id');

    if (buttonId === page.modalShadow.getAttribute('id')){
        // Close all forms on shadow click
        page.hideAll();
        return;
    }

    page.show(page.modalShadow); // Display modal shadow

    if (buttonId === page.buttons.add.getAttribute('id')) {
        // Display dropdown buttons
        page.show(page.dropdownCont);
        return;
    }

    // Display modal & hide dropdown buttons
    page.show(page.modal);
    page.hide(page.dropdownCont);
    
    if (buttonId === page.buttons.displayLForm.getAttribute('id')) {
        // add all project names into dropdown menu: <option value="misc">Miscellaneous</option> 
        page.show(page.listForm); // Display List form

    } else if (buttonId === page.buttons.displayPForm.getAttribute('id')) { 
        page.show(page.projectForm); // Display Project form
    }
    // else if (click edit)
        // load list tile into form areas
        // display edit form
}

function addNew(e) {
    // Prevent form submission
    e.preventDefault();

    const buttonId = e.target.getAttribute('id');
    console.log(e.target);
    //  Add List item
    if (buttonId === page.buttons.addItems.getAttribute('id')){
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

    // Selected new project in new list form
    } else if (buttonId === page.buttons.selectProjects.getAttribute('id')) {
        // Show project name field 
        if (e.target.options[e.target.selectedIndex].text === 'New project'){
            page.show(page.field.lProjectName);
            page.hide(page.buttons.selectProjects);
        }
        return;

    // Add Project 
    } else if (buttonId === page.buttons.addProject.getAttribute('id')) {
        // Add Project name to memory
        let projectName = page.field.lProjectName.value;
        projects[projectName] = new Project (page.field.pDueDate.value, []);

        // field: {
        //     listName: document.getElementById('listName'),
        //     priority: document.getElementById('priority'),
        //     lDueDate: document.getElementById('ldueDate'),
            //     lProjectName: document.getElementById('lFormProjName'),
            //     projectName: document.getElementById('projName'),
            //     pDueDate: document.getElementById('pDueDate')

    // Add list
    } else {
        // Get list data from DOM
        let listName = page.field.listName.value;
        let dueDate = page.field.lDueDate.value;
        let elements = document.getElementsByClassName('formItem');
        let items = []; 
        for (let i = 0; i < elements.length; i++) { // Get list values from list elements array
            items.push(elements[i].value);
        }
        let priority;
        for (let i = 0; i < page.field.priority.length; i++) {
            if (page.field.priority[i].selected === 'true') { // Get priority value from select priority array
                priority = page.field.priority[i].value;
            }
        }
        // Construct new list
        let list = new List (dueDate, priority, items);

        let projectName;
        // If adding new project within list form
        if (window.getComputedStyle(page.field.lProjectName).display === 'flex'){
            // Create and add new project
            projectName = page.field.lProjectName.value;
            projects[projectName] = new Project (projectName, page.field.pDueDate.value, []) 
        } else {
            for (let i = 0; i < page.field.projDropdown.length; i++) {
                if (page.field.projDropdown[i].selected === 'true') { // Get project value from select project array
                    projectName = page.field.projDropdown[i].value;
                }
            }
        }
        console.log('projects[projectName].lists:', projects[projectName].lists);
        // Add list to existing project
        projects[projectName].lists.push(listName);
        projects[projectName].lists[listName] = list;
        // Reset list counter
        page.listCounter = 1;
        console.log('projects:', projects);
        page.hideAll;
    }
}


// Events ////////////////////////////////////////////////////////
page.modalShadow.addEventListener('click', displayForm);
page.buttons.add.addEventListener('click', displayForm);
page.buttons.displayPForm.addEventListener('click', displayForm);
page.buttons.displayLForm.addEventListener('click', displayForm);
page.buttons.addItems.addEventListener('click', addNew);
page.buttons.addList.addEventListener('click', addNew);
page.buttons.addProject.addEventListener('click', addNew);
page.buttons.selectProjects.addEventListener('change', addNew);

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