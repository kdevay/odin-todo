import './style.css';
import './normalize.css';
import Add from './add.png';
import Dots from './dots.png';

// functions ////////////////////////////////////////////////////////
// function applyEdit(e) {
//     // update list item
// }
// function addNew(e) {
//     // Add form data to memory depending on button id
//      const buttonId = e.target.getAttribute('id');
//     // if (click addProject)
//         // add to projects object
//     // else
//         // add list to appropriate project object
//         // add to list object
// }
// function addItem(e) {
//     // get data id
//     // update value of button data id
//     // add new form area for another item
//     // use data id to set id of new form area
// }
// Display appropriate form based on button id
function displayForm(e) {
    const buttonId = e.target.getAttribute('id');
    if (buttonId === page.plus) {
        // display dropdown (new project, new list)
        console.log("hootie");
        page.addButtonsCont.style.display = 'flex';
        return;
    } 
    page.modalShadow.style.display = 'flex';
    page.modal.style.display = 'flex';
    if (buttonId === page.list.displayForm) {
        // add all project names into dropdown menu
        // <option value="misc">Miscellaneous</option> 
        // display new list form
        // page.listForm.style.display = 'block';
    } else if (buttonId === page.project.displayForm) {
        // display new project form
        page.project.formContainer.style.display = 'block';
    }
    // else if (click edit)
        // load list tile into form areas
        // display edit form
}

// Add '+' icon
const addIcon = document.createElement('img'); // Add new list/project
addIcon.setAttribute('class', 'icon');
addIcon.setAttribute('id', 'plus');
addIcon.setAttribute('src', Add);
document.getElementById('icon-cont').appendChild(addIcon);


// All buttons and containers in page
const page = {
    modal: document.getElementById('modal'),
    modalShadow: document.getElementById('modalShadow'),
    plus: addIcon,
    addButtonsCont: document.getElementById('addButtons'),
    project: {
        displayForm: document.getElementById('displayProjectForm'),
        formContainer: document.getElementById('newProjForm')
    },
    list: {
        displayForm: document.getElementById('displayListForm'),
        formContainer: document.getElementById('newListForm')
    }
    
};

// Events ////////////////////////////////////////////////////////
page.plus.addEventListener('click', displayForm);
page.project.displayForm.addEventListener('click', displayForm);
page.list.displayForm.addEventListener('click', displayForm);

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