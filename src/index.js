import './style.css';
import './normalize.css';
import Add from './add.png';
import Dots from './dots.png';

// Add '+' icon
const addIcon = document.createElement('img'); // Add new list/project
addIcon.setAttribute('class', 'icon');
addIcon.setAttribute('id', 'plus');
addIcon.setAttribute('src', Add);
document.getElementById('icon-cont').appendChild(addIcon);

// All buttons and containers in page
const page = { 
    listCounter: 1;
    listItemsOL: document.getElementById('formListItems'),
    dropdownCont: document.getElementById('addButtons'),
    modal: document.getElementById('modal'),
    modalShadow: document.getElementById('modalShadow'),
    projectForm: document.getElementById('newProjForm'),
    listForm: document.getElementById('newListForm'),
    lFormAddP: document.getElementById('lFormProjName');
    buttons: { 
        add: addIcon,
        displayPForm: document.getElementById('displayProjectForm'),
        displayLForm: document.getElementById('displayListForm'),
        addItems: document.getElementById('addItems'),
        addList: document.getElementById('addList'),
        addProject: document.getElementById('addProject'),
        addLP: document.getElementById('listToNewProject')
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
    }
};

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

// Events ////////////////////////////////////////////////////////
page.modalShadow.addEventListener('click', displayForm);
page.buttons.add.addEventListener('click', displayForm);
page.buttons.displayPForm.addEventListener('click', displayForm);
page.buttons.displayLForm.addEventListener('click', displayForm);
// page.buttons.addItems.addEventListener('click', addNew);
// page.buttons.addList.addEventListener('click', addNew);
// page.buttons.addProject.addEventListener('click', addNew);
// page.buttons.addLP.addEventListener('click', addNew);

// Set Defaults
page.hideAll();



// function applyEdit(e) {
//     // update list item
// }
// Add form data to memory depending on button id
function addNew(e) {
    // Prevent form submission
    e.preventDefault();

    const buttonId = e.target.getAttribute('id');
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
    }
    
    // Add new project in new list form
    // page.buttons.addLP.getAttribute('id');
    // page.show(page.lFormAddP);
    
    // Add Project 
    // page.buttons.addProject.getAttribute('id');
    
    // Add list
    // page.buttons.addList.getAttribute('id');
    // if project input field display==='block'
    //else
}
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