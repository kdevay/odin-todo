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
// Add default file
const misc = new Project ('Miscellaneous', []);
projects.push(misc);

// Add '+' icon
const addIcon = document.createElement('img'); // Add new list/project
addIcon.setAttribute('class', 'icon');
addIcon.setAttribute('id', 'plus');
addIcon.setAttribute('src', Add);
document.getElementById('icon-cont').appendChild(addIcon);

// All buttons and containers in page
const page = { 
    content: document.getElementById('content'),
    currentView: document.getElementById('currentView'),
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
    show(element) { // TODO: add language for grid containers
        element.getAttribute('class') === 'tile' ? element.style.display = 'grid' : element.style.display = 'flex';
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
    orphan(elements){
        let length = elements.length;
        if (!length){
            return;
        }
        length--;
        for (let i = length; i >= 0; i--) {
            this.content.removeChild(elements[i]);
        }
    },
    clearForms() {
        page.listForm.reset();
        page.projectForm.reset();
    },
};

// functions ////////////////////////////////////////////////////////
const get = {
    list(name, parentProject) {
        for (let i = 0; i < parentProject.lists.length; i++) {
            if (parentProject.lists[i].name === name) {
                return parentProject.lists[i];
            }
        }
    },
    project(name) {
        for (let i = 0; i < projects.length; i++){
            if (projects[i].name === name){
                return projects[i];
            }
        }
    }
};

const update = {
    isCheckedStatus(e) {
        let checked; // Check if box is checked
        e.target.checked ? checked = true : checked = false;
        // Get project to get list to get list item
        let projectObject = get.project(e.target.getAttribute('data-id'));
        let nameID = e.target.getAttribute('name');
        let listName = nameID.slice(0, (nameID.length - 1));
        let itemIndex = nameID.slice(nameID.length - 1);
        let listObject = get.list(listName, projectObject);
        listObject.items[itemIndex].isChecked = checked; // Update check status
    }
};

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
        project.setAttribute('class', 'sideProjects');
        project.setAttribute('id', name);
        project.addEventListener('click', this.projectView);
        // Add elements to DOM
        page.sidebar.appendChild(div);
        div.appendChild(project);
    },              
    listFile(listName, projectName) {
        // Logic for un-selected project Name
        projectName ? projectName = projectName : projectName = 'Miscellaneous';
        // Create p element
        let list = document.createElement('p');
        list.textContent = listName;
        list.setAttribute('data-id', projectName);
        list.setAttribute('class', 'sideLists');
        list.setAttribute('id', listName);
        list.addEventListener('click', this.listView);
        // Get parent element
        let parent = document.getElementById('parent' + projectName);
        parent.appendChild(list);
    },
    // else if (click edit)
        // load list tile into form areas
        // display edit form
    listView(e) {
        // Orphan all tiles
        console.log('entered listView');
        page.orphan(document.getElementsByClassName('tile'));
        page.orphan(document.getElementsByClassName('PVTile'));

        // Get button data
        addNew.stopSub(e);
        page.hideAll();
        let projectParentName = e.target.getAttribute('data-Id');
        let listName = e.target.getAttribute('id');
        // Set header contents
        page.currentView.textContent = projectParentName + '  /  ' + listName;
        // Get project object and list data
        let projectObj = get.project(projectParentName);
        let listData = get.list(listName, projectObj);

        // Dynamically create tile
        const tile = document.createElement('div');
        tile.setAttribute('class', 'tile')
        page.content.appendChild(tile);
        const tileTop = document.createElement('div');
        tileTop.setAttribute('class', 'tileTop')
        tile.appendChild(tileTop);
        const headCont = document.createElement('div');
        headCont.setAttribute('class', 'headContainer')
        tileTop.appendChild(headCont)
        const name = document.createElement('h2');
        name.setAttribute('class', 'listTitle')
        name.textContent = listName;
        const due = document.createElement('h5');
        due.setAttribute('class', 'deadline')
        due.textContent = listData.dueDate;
        headCont.appendChild(name);
        headCont.appendChild(due);
        const checkCont = document.createElement('div');
        checkCont.setAttribute('class', 'checkContainer')
        const listItems = document.createElement('div');
        listItems.setAttribute('class', 'listItems')
        tile.appendChild(checkCont);
        tile.appendChild(listItems);

        //Dynamically create list and checkboxes
        for (let i = 0; i < listData.items.length; i++) {
            let tempCheck = document.createElement('input');
            tempCheck.setAttribute('type', 'checkbox');
            tempCheck.setAttribute('class', 'checkbox');
            tempCheck.setAttribute('name', listName + i);
            tempCheck.setAttribute('data-id', projectParentName);
            if (listData.items[i].isChecked) {
                tempCheck.checked = true;
            }
            tempCheck.addEventListener("change", update.isCheckedStatus);
            let tempItem = document.createElement('p');
            tempItem.setAttribute('class', 'listItem');
            tempItem.setAttribute('id', 'listIndex' + i);
            tempItem.textContent = listData.items[i].name;
            // Add to DOM
            checkCont.appendChild(tempCheck);
            listItems.appendChild(tempItem);
        }
        page.show(tile);
    },
    projectView(e){
        console.log('entered projectView');
        // Orphan all tiles
        page.orphan(document.getElementsByClassName('tile'));
        page.orphan(document.getElementsByClassName('PVTile'));

        addNew.stopSub(e);
        let projectName = e.target.getAttribute('id');
        page.currentView.textContent = projectName // Set header contents
        let projectObj = get.project(projectName); // Get project object
        // dynamically create PVTiles
        for (let i = 0; i < projectObj.lists.length; i++) {
            // Ceate tile elements
            let tile = document.createElement('div');
            tile.setAttribute('class', 'PVTile');
            let headingDiv = document.createElement('div');
            headingDiv.setAttribute('class', 'headingContainer');
            let listTitle = document.createElement('h2');
            listTitle.setAttribute('class', 'listTitle');
            listTitle.textContent = projectObj.lists[i].name;
            let deadline = document.createElement('h5');
            deadline.setAttribute('class', 'deadline');
            deadline.textContent = 'Due: ' + projectObj.lists[i].dueDate;
            let priority = document.createElement('h5');
            priority.setAttribute('class', 'deadline');
            priority.textContent = 'Priority: ' + projectObj.lists[i].priority;
            // Add tile to DOM
            page.content.appendChild(tile);
            tile.appendChild(headingDiv);
            headingDiv.appendChild(listTitle);
            headingDiv.appendChild(deadline);
            headingDiv.appendChild(priority);
        }
    }
};


const validate = {
    name(name, array, formType, datumType) {
        let errorMessage;
        formType === 'list' ? errorMessage = page.errorL : errorMessage = page.errorP;
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
        // Add li and nested input to DOM
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
            display.projectFile(projectName); 

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
        parentProject = get.project(projectName);

        // validate listName name(name, formType, datumType)
        if (!validate.name(listName, parentProject.lists, 'list', 'list')){ // failed
            return;
        } 

        // Get list array values from list elements array
        for (let i = 0; i < elements.length; i++) { 
            let tempItem = elements[i].value;
            items.push({name: tempItem, isChecked: false});
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
        display.listFile(listName, projectName);
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
display.projectFile(misc.name);
// TODO: hide files on initial page load

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