// TODO: x
// edit button -started
// edit form  w/ save + delete buttons -started
// delete buttons -started
// local storage save
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
    editLForm: document.getElementById('editListForm'),
    editPForm: document.getElementById('editProjForm'),
    errorE: document.getElementById('editListNameError'),
    errorEP: document.getElementById('editProjNameError'),// pform
    errorL: document.getElementById('listNameError'),
    errorP: document.getElementById('projNameError'),
    listCounter: 1,
    editLCounter: 1,
    listForm: document.getElementById('newListForm'),
    listItemsOL: document.getElementById('formListItems'),
    modal: document.getElementById('modal'),
    modalShadow: document.getElementById('modalShadow'),
    projectForm: document.getElementById('newProjForm'),
    sidebar: document.getElementById('files'),
    edit: {
        addItems: document.getElementById('editAddItems'),
        dueDate: document.getElementById('editDueDate'),
        listItems: document.getElementById('editFormListItems'),
        listName: document.getElementById('editListName'),
        listSubmit: document.getElementById('editList'),
        newProject: document.getElementById('editFormProjName'),
        priority: document.getElementById('editPriority'),
        projectName: document.getElementById('editProjName'),// pform
        projectDrop: document.getElementById('editAllProjects'),
        projectSubmit: document.getElementById('editProject'), // pform
        rmItems: document.getElementById('editRmItems'),
        rmList: document.getElementById('deleteList'),
        rmProject: document.getElementById('deleteProject')// pform
    },
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
        rmItems: document.getElementById('rmItems'),
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
        this.hide(this.editLForm);
        this.hide(this.editPForm);
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
        this.listForm.reset();
        this.projectForm.reset();
        this.editLForm.reset();
        this.editPForm.reset();
    },
};

// functions ////////////////////////////////////////////////////////
const get = {
    project(name) {
        for (let i = 0; i < projects.length; i++){
            if (projects[i].name === name){
                return projects[i];
            }
        }
    },
    list(name, parentProject) {
        for (let i = 0; i < parentProject.lists.length; i++) {
            if (parentProject.lists[i].name === name) {
                return parentProject.lists[i];
            }
        }
    },
    listIndex(name, parentProject) { 
        for (let i = 0; i < parentProject.lists.length; i++) {
            if (parentProject.lists[i].name === name) {
                return i;
            }
        }
    },
    dropdownValue(dropDownArray){ 
        // Get value from dropdown menu
        for (let i = 0; i < dropDownArray.length; i++) {
            if (dropDownArray[i].selected === true) { 
                return dropDownArray[i].value;
            }
        }
        return false;
    }
};

const rm = { 
    allItems(id){ // rewrite this to include list form elements
        while (page.editLCounter > 1) {
            this.listItem(id);
            page.editLCounter--;
        }
    },
    listItem (e) { 
        e !== 'editLi' ? addNew.stopSub(e): e = e;
        let liId, parent; // Set values based on form type
        if (e === 'editLi' || e.target.getAttribute('id')[0] === 'e') { // For edit form
            // Ensure minimum list length
            if (page.editLCounter < 2) {
                return;
            }
            liId = 'editLi' + page.editLCounter;
            parent = edit.listItems;
            page.editLCounter--; // decrement counter
        } else { // For list form
            // Ensure minimum list length
            if (page.listCounter < 2) {
                return;
            }
            liId = 'li' + page.listCounter;
            parent = page.listItemsOL;
            page.listCounter--; // decrement counter
        }

        // Find last added list item 
        let lastItem = document.getElementById(liId);
        // Orphan last list item
        parent.removeChild(lastItem);
    }
};

const validate = { 
    name(name, array, datumType, isListForm) {
        // Get correct form error message
        let errorMessage = !isListForm  ? page.errorL : page.errorP;
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
    editName(name, array, OGindex){
        let errorMessage;
        
        for (let i = 0; i < array.length; i++){
            // If found same name somewhere other than the OG index
            if (i != OGindex && array[i].name.toLowerCase()  === name.toLowerCase()) { // Name is not unique
                errorMessage.style.display = 'block';
                errorMessage.textContent = 'ERROR: A list' + ' with the name \"' + name + '\" already exists for this project.';
                return false;
            }
        }
        return true;
    },
};

const update = {
    isCheckedStatus(e) {
        let checked = e.target.checked ? true : false; // Check if box is checked
        // Get project > get list > get list item
        let projectObject = get.project(e.target.getAttribute('data-id'));
        let nameID = e.target.getAttribute('name');
        let listName = nameID.slice(0, (nameID.length - 1));
        let itemIndex = nameID.slice(nameID.length - 1);
        let listObject = get.list(listName, projectObject);
        listObject.items[itemIndex].isChecked = checked; // Update check status
    }
};


const form = {  
    project() { // On '+project' button click
        page.show(page.modal); // Display modal
        page.show(page.modalShadow); // Display modal shadow
        page.hide(page.dropdownCont); // Hide '+' menu
        page.show(page.projectForm); // Display Project form
    },

    list() { // On '+list' button click
        page.hide(page.modalShadow); // Hide shadow
        page.hide(page.dropdownCont); // Hide '+' menu

        // Orphan additional list items from previous list
        while (page.listCounter > 1) {
            let lastItem = document.getElementById('li' + page.listCounter);
            page.listItemsOL.removeChild(lastItem); // Orphan last list item 
            page.listCounter--; // decrement list counter
        }

        page.show(page.listForm); // Display List form
    },

    edit(e) {
        let dataId = e.target.getAttribute('data-id');
        let name = e.target.getAttribute('id').slice(4);
        if (dataId === 'p') { // If editing project
            page.edit.projectName.value = name;// Add OG name to form
            page.show(page.editPForm);// open form
            return;
        } 
        // If editing list
        let projObj = get.project(dataId); 
        let list = get.list(name, projObj);
        page.edit.listSubmit.setAttribute('data-id', 'edits' + name); // Add data to submit button
        page.edit.listSubmit.setAttribute('data-parent', 'edits' + dataId);
        page.edit.dueDate.setAttribute('value', name); // Add name & deadline
        page.edit.listName.setAttribute('value', list.dueDate); 
        
        // Add list data to form
        for (let i = 0; i < page.edit.priority.length; i++) { // Select project
            if (dataId === page.edit.projectDrop[i].value) {
                page.edit.projectDrop[i].selected = true;
            }
        }
        for (let i = 0; i < page.edit.priority.length; i++) { // Select priority
            if (list.priority === page.edit.priority[i].value) {
                page.edit.priority[i].selected = true;
            }
        }
        for (let i = 0; i < list.items.length; i++) { // Add list items to form
            let tempLI = addNew.listItem('editLi');
            tempLI.setAttribute('value', list.items[i]);
            tempLI.checked = list.items[i].checked;
        }
        page.hideAll(); // Reset defaults
        page.clearForms();
        page.editLForm.style.display = 'flex'; // Display edit list form
        rm.allItems('editLi'); // Reset form list fields
    }
};

// Display appropriate DOM object(s)
const display = { 
    shadowClick() { // Close all forms on shadow click
        page.hideAll();
        page.clearForms();
    },

    add() { // On '+' icon click,
        page.show(page.modalShadow); // Display modal shadow & '+' menu
        page.show(page.dropdownCont);
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
        const editButton = document.createElement('img'); // EDIT BUTTON TO project
        editButton.setAttribute('id', 'edit' + projectName);
        editButton.setAttribute('data-id', 'p');
        editButton.setAttribute('class', 'icon'); 
        editButton.setAttribute('src', Dots);
        editButton.addEventListener('click', form.edit); 
        tileTop.appendChild(editButton); // either tile or headingDiv !!!!!
        page.sidebar.appendChild(div);// Add elements to DOM
        div.appendChild(project);
    }, 

    listFile(listName, projectName) {
        projectName = !projectName ? 'Miscellaneous' : projectName; // Default to miscellaneous
        let list = document.createElement('p'); 
        list.textContent = listName; 
        list.setAttribute('data-id', projectName);// Add project data to element
        list.setAttribute('class', 'sideLists');
        list.setAttribute('id', listName);
        list.addEventListener('click', this.listView);
        let parent = document.getElementById('files'); // Get parent element
        parent.appendChild(list);
    },

    listView(e) {
        addNew.stopSub(e);
        page.orphan(document.getElementsByClassName('tile')); // Orphan all tiles
        page.orphan(document.getElementsByClassName('PVTile'));
        page.hideAll(); 

        let projectName = e.target.getAttribute('data-Id'); // Get button data
        let listName = e.target.getAttribute('id');
        
        page.currentView.textContent = projectName + '  /  ' + listName; // Set header
        let projectObj = get.project(projectName); // Get project object and list data
        let listData = get.list(listName, projectObj);

        // Dynamically create tile
        const tile = document.createElement('div'); // tile
        tile.setAttribute('class', 'tile')
        page.content.appendChild(tile);
        const tileTop = document.createElement('div'); // Top container
        tileTop.setAttribute('class', 'tileTop')
        const editButton = document.createElement('img'); // EDIT BUTTON
        editButton.setAttribute('id', 'edit' + listName);
        editButton.setAttribute('data-id', 'edit' + projectName);
        editButton.setAttribute('class', 'icon'); 
        editButton.setAttribute('src', Dots);
        editButton.addEventListener('click', addNew.listEdit);
        const headCont = document.createElement('div'); // Header container
        headCont.setAttribute('class', 'headContainer')
        const name = document.createElement('h2'); // Header
        name.setAttribute('class', 'listTitle')
        name.textContent = listName;
        const due = document.createElement('h5'); // Deadline
        due.setAttribute('class', 'deadline')
        due.textContent = listData.dueDate;
        const checkCont = document.createElement('ol'); // List container
        checkCont.setAttribute('class', 'checkContainer')
        tile.appendChild(tileTop); // Add to DOM
        tileTop.appendChild(editButton); 
        tileTop.appendChild(headCont)
        headCont.appendChild(name);
        headCont.appendChild(due);
        tile.appendChild(checkCont);
        
        //Dynamically create list and checkboxes
        for (let i = 0; i < listData.items.length; i++) {
            let tempLi = document.createElement('li'); // List item
            tempLi.setAttribute('class', 'lvcheckItem');
            let tempCheck = document.createElement('input'); // Checkbox
            tempCheck.setAttribute('type', 'checkbox');
            tempCheck.setAttribute('class', 'checkbox');
            tempCheck.setAttribute('name', listName + i);
            tempCheck.setAttribute('data-id', projectName);
            if (listData.items[i].isChecked) { // Add checkbox value
                tempCheck.checked = true;
            }
            tempCheck.addEventListener("change", update.isCheckedStatus);
            let tempItem = document.createElement('p'); // List item value
            tempItem.setAttribute('class', 'listItem');
            tempItem.setAttribute('id', 'listIndex' + i);
            tempItem.textContent = listData.items[i].name;
            checkCont.appendChild(tempLi); // Add to DOM
            tempLi.appendChild(tempCheck);
            tempLi.appendChild(tempItem);
        }
        page.show(tile);
    },

    projectView(e) {
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
            // Create tile elements
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

const addNew = {
    stopSub(e) {
    // Prevent form submission
    e.preventDefault();
    },

    //  Add list item
    listItem(e) {
        e !== 'editLi' ? addNew.stopSub(e) : e = e;
        let liId, inputId, parent; // Set id values based on form type
        if (e === 'editLi' || e.target.getAttribute('id')[0] === 'e') { // For edit form
            page.editLCounter++
            parent = edit.listItems;
            liId = 'editLi' + page.editLCounter;
            inputId = 'editListItem' + page.editLCounter;
        } else { // For list form
            page.listCounter++;
            parent = page.listItemsOL;
            liId = 'li' + page.listCounter;
            inputId = 'listItem' + page.listCounter;
        }
        // Add li and nested text input to DOM
        let tempLI = document.createElement('li');
        tempLI.setAttribute('id', liId);
        let tempInput = document.createElement('input');
        tempInput.setAttribute('class', 'formItem');
        tempInput.setAttribute('type', 'text');
        tempInput.setAttribute('id', inputId);
        tempLI.appendChild(tempInput);
        parent.appendChild(tempLI);
        if (e === 'editLi'){ // return element if accessed in edit form generation
            return tempLI;
        }
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
        let projectName = page.fields.projectName.value; // Get Project name 

        if (!validate.name(projectName, projects, 'project', false)){
            return false; // Validate project name
        }

        addNew.dropProj(projectName)// Add project to dropdown
        projects.push(new Project (projectName, [])); // Add project to projects
        display.projectFile(projectName); // Add project to sidebar
        page.hideAll(); // Reset defaults
        page.clearForms();
    },

    list(e) {
        addNew.stopSub(e);
        let listName = page.fields.listName.value;// Get list data from form
        let dueDate = page.fields.dueDate.value;
        let elements = document.getElementsByClassName('formItem');
        let items = []; 
        let priority, projectName;

        // If creating new project
        if (window.getComputedStyle(page.fields.lProjectName).display === 'flex'){
            projectName = page.fields.lProjectName.value; // Get project name  
            if (!validate.name(projectName, projects, 'project', true)){ // Validate project name
                return;
            }
            addNew.dropProj(projectName) // Add project to dropdown 
            projects.push(new Project (projectName, [])); // Add project to projects
            display.projectFile(projectName); // Add project to sidebar

        } else { // Get project value from dropdown
            projectName = get.valueFromDropdown(page.fields.projDropdown);
            projectName = !projectName ? 'Miscellaneous' : projectName; // Default to miscellaneous 
        }
        let parentProject = get.project(projectName); // Get project object
        
        if (!validate.name(listName, parentProject.lists, 'list', true)){ // Validate list Name
            return;
        } 

        for (let i = 0; i < elements.length; i++) { // Get list items 
            items.push({name: elements[i].value, isChecked: false});
        }
        //valueFromDropdown(dropDownArray)
        priority = get.dropdownValue(page.form.priority) === '' ?  'normal' : priority; // Default to OG value
        
        let list = new List (listName, dueDate, priority, items);// Construct new list
        parentProject.lists.push(list); // Add list to parent
        display.listFile(listName, projectName);// Add list to DOM 

        // Reset to default view
        page.show(page.buttons.selectProjects);
        page.clearForms();
        page.hideAll();
    },
    projEdit () { // when project edit form is submitted
        //
    },
    // when list edit form is submitted
    listEdit() { 
        addNew.stopSub(e);
        // Get OG list data from button 
        let listName = e.target.getAttribute('data-id');
        listName = listName.slice(5);
        let projectName = e.target.getAttribute('data-parent');
        projectName = projectName.slice(5);
        let projectObj = get.project(projectName);
        let listObj = get.list(listName, projectObject);

        // Get list data from form
        let newListName = page.edit.listName.value; // 
        let newDueDate = page.edit.dueDate.value;
        let listElements = document.getElementsByClassName('editFormItem');
        let newProjectName, newProjectObj;
        let newItems = []; 

        // If adding a new project
        if (window.getComputedStyle(page.edit.newProject).display === 'flex'){
            newProjectName = page.edit.newProject.value; // Validate project name
            if (!validate.name(newProjectName, projects, 'project', true)) {
                return;
            }
            addNew.dropProj(newProjectName) // Add project to dropdown & projects
            newProjectObj = new Project (newProjectName, [])
            projects.push(newProjectObj);
            display.projectFile(newProjectName); // Update DOM

        } else { // Else, get project name from dropdown menu
            newProjectName = get.dropdownValue(page.edit.projectDrop);
            newProjectName = newProjectName === '' ? projectName : newProjectName;
            newProjectObj = get.project(newProjectName); // Get project object
        }

        let newPriority = get.dropdownValue(page.edit.priority); // Get priority

        // Blank fields default to OG values 
        newPriority = newPriority === '' ? listObj.priority : newPriority;
        newDueDate = newDueDate === '' ? listObj.dueDate : newDueDate;
        newListName = newListName === '' ? listName : newListName;
        if (!listElements) { 
            newItems = listObj.list; 
        } else {  // Get list from list elements array
            for (let i = 0; i < listElements.length; i++) { 
                let tempItem = listElements[i].value;
                newItems.push({name: tempItem, isChecked: false});
            }
        }

        let index = get.listIndex(listName, projectObj)// Get OG list index from OG project
        editName(newListName, newProjectObj.lists, index); // Ensure new list name is unique
        let newList = new List (newListName, newDueDate, newPriority, newItems); 

        // If list moved to new project
        if (newProjectName !== projectName) {
            newProjectObj.lists.push(newList); // Add list to project
            newProjectObj.lists.splice(index, 1); // Rm OG list from OG project
            rm.listFile(listName, newProjectObj, projectObj, index) // Remove OG list from DOM
            display.listFile(newListName, newProjectName); // Add list to DOM 
        } else { // If list remains in OG project
            projectObj.lists[index] = newList; // Replace OG list with new list
            rm.listFile(listName, 1, projectObj, index) // Remove OG list from DOM
        }

        // Reset to defaults
        page.editLCounter = 1;
        page.show(page.buttons.editSelectProjects);
        page.clearForms();
        page.hideAll();
    }
};

// Events ////////////////////////////////////////////////////////
addIcon.addEventListener('click', display.add);
page.modalShadow.addEventListener('click', display.shadowClick);
page.buttons.displayPForm.addEventListener('click', form.project); 
page.buttons.displayLForm.addEventListener('click', form.list);
page.buttons.addItems.addEventListener('click', addNew.listItem);
page.buttons.rmItems.addEventListener('click', rm.listItem);
page.buttons.addList.addEventListener('click', addNew.list);
page.buttons.addProject.addEventListener('click', addNew.project);
page.buttons.selectProjects.addEventListener('change', addNew.listProj);
page.edit.addItems.addEventListener('click', addNew.listItem);
page.edit.rmItems.addEventListener('click', rm.listItem);
page.edit.listSubmit.addEventListener('click', form.edit); 
page.edit.projectSubmit.addEventListener('click', form.edit);


// Set Defaults
page.hideAll();
display.projectFile(misc.name);