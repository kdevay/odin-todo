// TODO: x
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
    confirmDeleteForm: document.getElementById('confirmDelete'),
    confirmMessage: document.getElementById('confirmationMessage'),
    currentView: document.getElementById('currentView'),
    editCV: document.getElementById('editCV'),
    dropdownCont: document.getElementById('addButtons'),
    editLForm: document.getElementById('editListForm'),
    editPForm: document.getElementById('editProjForm'),
    errorE: document.getElementById('editListNameError'),
    errorEP: document.getElementById('editProjNameError'),// pform
    errorL: document.getElementById('listNameError'),
    errorP: document.getElementById('projNameError'),
    listForm: document.getElementById('newListForm'),
    listItemsOL: document.getElementById('formListItems'), 
    modal: document.getElementById('modal'),
    modalShadow: document.getElementById('modalShadow'),
    projectForm: document.getElementById('newProjForm'),
    sidebar: document.getElementById('files'),
    edit: {  
        addItems: document.getElementById('editAddItems'),
        cancel: document.getElementById('cancelEdit'),
        dueDate: document.getElementById('editDueDate'),
        firstLi: document.getElementById('edit0'),
        firstInput: document.getElementById('editlistItem0'),
        listItems: document.getElementById('editFormListItems'),
        listName: document.getElementById('editListName'),
        listSubmit: document.getElementById('editList'),
        projectField: document.getElementById('editFormProjName'),
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
        delCancel: document.getElementById('cancelDelete'),
        delConfirm: document.getElementById('deleteConfirmed'),
        displayPForm: document.getElementById('displayProjectForm'),
        displayLForm: document.getElementById('displayListForm'),
        addItems: document.getElementById('addItems'),
        rmItems: document.getElementById('rmItems'),
        addList: document.getElementById('addList'),
        addProject: document.getElementById('addProject'),
        addLP: document.getElementById('listToNewProject'),
        selectProjects: document.getElementById('allProjects'),
    }, 
    updateViewBar(isFill, name1, name2){ // Show current file view
        if (!isFill) { // clear viewBar
            page.currentView.textContent = '';
            page.editCV.textContent = '';
            return;
        }
        if (isFill === '-  edit') page.editCV.textContent = '-  edit';
        if (isFill === true) page.editCV.textContent = '';
        if (!name2) {
            page.currentView.textContent = name1;
            return;
        }
        page.currentView.textContent = name1 + '  /  ' + name2;
    },
    show(element) { // TODO: add language for grid containers
        element.style.display = element.getAttribute('class') === 'tile' ?  'block' : 'flex';
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
        this.hide(this.edit.projectField);
        this.hide(this.fields.lProjectName);
        this.hide(this.confirmDeleteForm);
    },
    orphan(className, toDelete, type){ // Permanently remove one or more items from DOM
        let parent;
        let elements = document.getElementsByClassName(className);
        // If no elements of 'className' exist, exit
        if (!elements.length) return; 
        // Set parent based on element type
        if (type === 'tile' || type === 'pvTile') { // For tiles
            parent = this.content;
        } else if (type === 'edit'){ 
            parent = document.getElementById('editFormListItems');// For edit form items
        } else { 
            parent = document.getElementById('formListItems'); // For list form items
        }
        // Perform action based on toDelete
        if (toDelete === "all") { // Remove all elements
            for (let i = elements.length - 1; i >= 0; i--) {
                parent.removeChild(elements[i]);
            }
            return;
        } else if(toDelete === 1 && elements.length !== 1){ // Remove last item 
            parent.removeChild(elements[elements.length - 1]); 
            return;
        }
        for (let i = elements.length - 1; i > 0; i--) {
            parent.removeChild(elements[i]); // Remove all except first item
        }
    },
    clearForms() {
        this.listForm.reset();
        this.projectForm.reset();
        this.editLForm.reset();
        this.editPForm.reset();
    },
    stopSub(e) {
        // Prevent form submission
        e.preventDefault();
        }
};

// functions //////////////////////////////////////////////////////////////////////////////////////
const get = {
    project(name) { // Returns a project object
        for (let i = 0; i < projects.length; i++){
            if (projects[i].name === name){
                return projects[i];
            }
        }
        return false;
    },
    projectIndex(name) {
        for (let i = 0; i < projects.length; i++) {
            if (projects[i].name === name){
                return i;
            }
        }
    },
    list(name, parentProject) { // Returns a list object
        for (let i = 0; i < parentProject.lists.length; i++) {
            if (parentProject.lists[i].name === name) {
                return parentProject.lists[i];
            }
        }
        return false;
    },
    listIndex(name, parentProject) { // Returns a list's index within it's parent project
        for (let i = 0; i < parentProject.lists.length; i++) {
            if (parentProject.lists[i].name === name) {
                return i;
            }
        }
        return false;
    },
    listItemValues(elements) { // Returns an array of list item objects
        if (!elements.length) return false; // Exit if array is empty
        let list = [];
        for (let i = 0; i < elements.length; i++) {
            list.push({name: elements[i].value, isChecked: false});
        }
        return list;
    },
    dropdownValue(dropDownArray){ // Get value from dropdown menu
        for (let i = 0; i < dropDownArray.length; i++) {
            if (dropDownArray[i].selected === true) { 
                return dropDownArray[i].value;
            }
        }
        return false;
    },
    lastElement(className){ // Returns last element in an HTML collection
        let elements = document.getElementsByClassName(className);
        return !elements.length ? false : elements[elements.length - 1];
    }
};

const validate = { 
    // Validate list name from list form & project name from edit & list forms 
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
    editedName(name, array, OGindex){ // Validate list name from error form
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
        let listName = e.target.getAttribute('name');
        let itemIndex = e.target.getAttribute('data-index');
        let projectObj = get.project(e.target.getAttribute('data-id'));
        let listObject = get.list(listName, projectObj);
        listObject.items[itemIndex].isChecked = checked; // Update check status
    }, 
};


const form = {  
    project() { // On '+project' button click
        page.show(page.modal); // Display modal
        page.show(page.modalShadow); // Display modal shadow
        page.hide(page.dropdownCont); // Hide '+' menu
        page.updateViewBar(false, '', ''); // Clear current file view
        page.show(page.projectForm); // Display Project form
    },

    list() { // On '+list' button click
        page.hide(page.modalShadow); // Hide shadow
        page.hide(page.dropdownCont); // Hide '+' menu
        page.orphan('listItemParent', 'all-1', 'list'); // Orphan list items from previous list
        page.updateViewBar(false, '', ''); // Clear current file view
        page.show(page.listForm); // Display List form
    },

    showProjInput(e) { // Adding new project from list/edit forms 
        page.stopSub(e);
        console.log('e.target.value: ', e.target.value);
        // if show 'new project' field is selected
        if (e.target.value === 'New Project') {
            if (e.target === page.edit.projectDrop) {
                page.show(page.edit.projectField);
                page.hide(page.edit.projectDrop);
            } else {
                page.show(page.fields.lProjectName);
                page.hide(page.buttons.selectProjects);
            }
        }
    
    },

    selectDrop(value, array) { // Pre-select a dropdown element in a form
        for (let i = 0; i < array.length; i++) { // Select project
            if (array[i].selected === true && value !== array[i].value) {
                array[i].selected = false;
            } else if (value === array[i].value) {
                array[i].selected = true;
            }
        }
    },

    dropProj(name) { // Add new project name to dropdowns
        let temp1 = document.createElement('option');
        let temp = document.createElement('option');
        temp1.setAttribute('class', 'addedProject');
        temp1.setAttribute('value', name);
        temp1.textContent = name;
        temp.setAttribute('class', 'addedProject');
        temp.setAttribute('value', name);
        temp.textContent = name;
        page.fields.projDropdown.appendChild(temp1); // add to list form
        page.edit.projectDrop.appendChild(temp); // add to edit form
    },

    rmDropProj(name){ // Remove project name from dropdowns
        // Get all added projects from dropdowns
        let projects = document.getElementsByClassName('addedProject');
        for (let i = projects.length - 1; i > -1; i--) {
            if (projects[i].getAttribute('value') === name ){
                projects[i].remove; // remove project
            }
        }
    },


    rmListItem (e) { // Rm list item
        page.stopSub(e);
        // Set values based on form type
        if (e.target.getAttribute('id') === 'editRmItems') { // For edit form
            page.orphan('eListItemParent', 1, 'edit');
            return;
        }// For list form
        page.orphan('listItemParent', 1, 'list');
        
    },

    addListItem(e) { // Add list item
        //hide tiles
        e !== 'editLi' ? page.stopSub(e) : e = e; // If accessed during pre-fill of edit form 
        let liClass, inputClass, inputId, tempLi, tempInput, parent; // Set values based on form type
        if (e === 'editLi' || e.target === page.edit.addItems ){ // For edit form
            parent = page.edit.listItems;
            liClass = 'editListItemParent';
            inputId = 'editListItem' //counter
            inputClass = 'editFormItem';
        } else { // For list form
            parent = page.listItemsOL;
            liClass = 'listItemParent';
            inputId = 'listItem'
            inputClass = 'formItem';
        } 
        let lastElement = get.lastElement(liClass); // Get counter from last element
        let counter = lastElement.getAttribute('data-id');
        counter++
        tempLi = document.createElement('li'); // Add li to DOM 
        tempLi.setAttribute('data-id', counter);
        tempLi.setAttribute('class', liClass);
        tempInput = document.createElement('input'); // Add input to DOM
        tempInput.setAttribute('class', inputClass);
        tempInput.setAttribute('type', 'text');
        tempInput.setAttribute('id', inputId + counter);
        tempLi.appendChild(tempInput);
        parent.appendChild(tempLi)
        // Return element if accessed in pre-fill of edit form 
        if (e === 'editLi') return tempInput;
    },

    edit(e) { // On '...' click, generated pre-filled edit form
        let dataId = e.target.getAttribute('data-id');
        let name = e.target.getAttribute('id').slice(4);
        // If editing project
        if (dataId === 'p') { 
            // If editing default project, hide delete button
            page.edit.rmProject.style.display = get.projectIndex(name) === 0 ? 'none' : 'block'
            page.edit.projectName.value = name;// Pre-fill form with OG name
            page.edit.projectSubmit.setAttribute('data-id', name); // Add name to submit button
            page.buttons.delConfirm.setAttribute('data-name', name); // Add data to confirm deletion
            page.buttons.delConfirm.setAttribute('data-type', 'project');
            page.updateViewBar('-  edit', dataId, false); // Show current file view
            page.show(page.modal); // Display modal
            page.show(page.modalShadow);
            page.show(page.editPForm);// open form
            return;
        } 
        // If editing list
        let projObj = get.project(dataId); 
        let list = get.list(name, projObj);
        page.edit.listSubmit.setAttribute('data-id', name); // Add data to submit button
        page.edit.listSubmit.setAttribute('data-parent', dataId);
        page.buttons.delCancel.setAttribute('data-name', name); // Add data to cancel deletion
        page.buttons.delCancel.setAttribute('data-proj', dataId);
        page.buttons.delConfirm.setAttribute('data-name', name);// Add data to confirm deletion
        page.buttons.delConfirm.setAttribute('data-proj', dataId);
        page.buttons.delConfirm.setAttribute('data-type', 'list');

        // Pre-fill form with list data
        page.edit.listName.setAttribute('value', name); // Name
        page.edit.dueDate.setAttribute('value', list.dueDate); // Deadline
        form.selectDrop(dataId, page.edit.projectDrop); // Project name
        form.selectDrop(list.priority, page.edit.priority); // Priority
        // Add first list item to form
        page.edit.firstInput.value = list.items[0].name;
        for (let i = 1; i < list.items.length; i++) { // List Items
            let tempLi = form.addListItem('editLi');
            tempLi.setAttribute('value', list.items[i].name);
        }
        page.hideAll(); // Clear display
        page.orphan('tile', 'all', 'tile');
        page.orphan('lvTile', 'all', 'tile');
        page.orphan('pvTile', 'all', 'tile');
        page.updateViewBar('-  edit', dataId, name); // Show current file view
        page.editLForm.style.display = 'flex'; // Display edit list form
    }
};

const display = { // Display appropriate DOM object(s)
    shadowClick(e) { // Close all forms on shadow click
        page.stopSub(e);
        page.hideAll();
        page.clearForms();
    },

    cancel(e) {
        page.stopSub(e);
        display.shadowClick(e);
        page.updateViewBar(false, '', ''); // Clear current file view
    },
    
    confirm(e) { // Displays modal confirming project or list deletion
        page.stopSub(e);
        let name = e.target.getAttribute('data-name');
        if (e.target.getAttribute('data-type') === 'project') {
            page.confirmMessage = 'You are about to delete \"' + name + '\" and every list associated with this project.';
        } else {
            page.confirmMessage = 'You are about to delete \"' + name + '\".';
        }
        page.hide(page.editPForm);
        page.show(page.modalShadow); // Display modal
        page.show(page.modal); 
        page.show(page.confirmDeleteForm);
    },

    delete(e){ // Deletes list/project from dom and memory
        page.stopSub(e);
        page.hideAll(); // Reset to defaults
        page.clearForms();
        page.updateViewBar(false, '', ''); 
        if (e.target.getAttribute('data-type') === 'project'){
            // delete project from memory
            let projectName = e.target.getAttribute('data-name')
            let index = get.projectIndex(projectName);
            projects.splice(index);
            // delete from sidebar
            console.log('projectName', projectName);
            console.log('parent + projectName', 'parent' + projectName);
            let file = document.getElementById('parent' + projectName);
            file.remove();
            return;
        }
        let listName = e.target.getAttribute('data-name');
        let projectName = e.target.getAttribute('data-proj');
        // delete list from memory
        let projObj = get.project(projectName);
        let index = get.listIndex(listName, projObj);
        projObj.lists.splice(index);
        // delete list from sidebar
        let projIndex = get.projectIndex(projectName);
        let listFile = document.getElementById(projIndex + listName);
        listFile.remove();
    },

    add() { // On '+' icon click,
        page.show(page.modalShadow); // Display modal shadow & '+' menu
        page.show(page.dropdownCont);
    },

    listView(e) { // Show a single list
        page.stopSub(e);
        page.orphan('tile', 'all', 'tile'); // Orphan all tiles
        page.orphan('lvTile', 'all', 'tile');
        page.orphan('pvTile', 'all', 'tile');
        page.hideAll(); 

        let projectName = e.target.getAttribute('data-proj'); // Get project name
        let listName = e.target.getAttribute('data-Id'); // Get list name
        page.updateViewBar(true, projectName, listName); // Update current file view
        let projectObj = get.project(projectName); // Get project and list objects
        let listObj = get.list(listName, projectObj);

        // Dynamically create tile
        const tile = document.createElement('div'); // tile
        tile.setAttribute('class', 'tile')
        const tileTop = document.createElement('div'); // Heading container
        tileTop.setAttribute('class', 'lvHead')
        const editButton = document.createElement('img'); // Edit button
        editButton.setAttribute('id', 'edit' + listName);
        editButton.setAttribute('data-id', projectName);
        editButton.setAttribute('class', 'dots'); 
        editButton.setAttribute('src', Dots);
        editButton.addEventListener('click', form.edit);
        const name = document.createElement('h2'); // Header
        name.setAttribute('class', 'listTitle')
        name.textContent = listName;
        const priority = document.createElement('h5'); // Priority
        priority.setAttribute('class', 'lvSubhead')
        priority.textContent = 'Priority:  ' + listObj.priority;
        const due = document.createElement('h5'); // Deadline
        due.setAttribute('class', 'lvSubhead')
        due.textContent = 'Deadline:  ' + listObj.dueDate;
        const checkCont = document.createElement('ol'); // List container
        checkCont.setAttribute('class', 'checkContainer')
        page.content.appendChild(tile); // Add to DOM
        tile.appendChild(tileTop);
        tileTop.appendChild(name)
        tileTop.appendChild(editButton); 
        tile.appendChild(priority);
        tile.appendChild(due);
        tile.appendChild(checkCont);
        
        //Dynamically create list and checkboxes
        for (let i = 0; i < listObj.items.length; i++) {
            let tempLi = document.createElement('li'); // List item
            tempLi.setAttribute('class', 'lvcheckItem');
            let tempCheck = document.createElement('input'); // Checkbox
            tempCheck.setAttribute('type', 'checkbox');
            tempCheck.setAttribute('class', 'checkbox');
            tempCheck.setAttribute('name', listName);
            tempCheck.setAttribute('data-index', i);
            tempCheck.setAttribute('data-id', projectName);
            if (listObj.items[i].isChecked) { // Add checkbox value
                tempCheck.checked = true;
            }
            tempCheck.addEventListener("change", update.isCheckedStatus);
            let tempItem = document.createElement('p'); // List item value
            tempItem.setAttribute('class', 'listItem');
            tempItem.setAttribute('id', 'listIndex' + i);
            tempItem.textContent = listObj.items[i].name;
            checkCont.appendChild(tempLi); // Add to DOM
            tempLi.appendChild(tempCheck);
            tempLi.appendChild(tempItem);
        }
        page.show(tile);
    },

    projectView(e) { // Show all lists within a project
        page.stopSub(e);
        page.orphan('tile', 'all', 'tile');// Orphan all tiles
        page.orphan('lvTile', 'all', 'tile');
        page.orphan('pvTile', 'all', 'tile');
        let projectName = e.target.getAttribute('id'); // Get project name
        page.updateViewBar(true, projectName, false); // Update current file view
        let projectObj = get.project(projectName); // Get project object
        
        for (let i = 0; i < projectObj.lists.length; i++) { // dynamically create PVTiles
            // Create tile elements
            let tile = document.createElement('div'); // Tile container
            tile.setAttribute('class', 'pvTile');
            tile.setAttribute('data-id',  projectObj.lists[i].name);
            tile.setAttribute('data-proj', projectName);
            tile.addEventListener('click', this.listView);
            let headingDiv = document.createElement('div'); // Heading container
            headingDiv.setAttribute('class', 'headingContainer');
            let listTitle = document.createElement('h2'); // Heading
            listTitle.setAttribute('class', 'listTitle');
            listTitle.textContent = projectObj.lists[i].name;
            let deadline = document.createElement('h5'); // Deadline
            deadline.setAttribute('class', 'deadline');
            deadline.textContent = 'Due: ' + projectObj.lists[i].dueDate;
            let priority = document.createElement('h5'); // Priority
            priority.setAttribute('class', 'deadline');
            priority.textContent = 'Priority: ' + projectObj.lists[i].priority;
            page.content.appendChild(tile); // Add to DOM
            tile.appendChild(headingDiv);
            headingDiv.appendChild(listTitle);
            headingDiv.appendChild(deadline);
            headingDiv.appendChild(priority);
        }
    },
    
    listFile(listName, projectName) { // Add list to sidebar
        projectName = !projectName ? 'Miscellaneous' : projectName; // Default to miscellaneous
        let parent = document.getElementById('sideUl' + projectName);// Get parent element
        let list = document.createElement('li'); 
        let projIndex = get.projectIndex(projectName);
        list.textContent = listName; 
        list.setAttribute('data-proj', projectName); // Add data to element
        list.setAttribute('data-id', listName);
        list.setAttribute('class', 'sideLists');
        list.setAttribute('id', projIndex + listName);
        list.addEventListener('click', this.listView);
        parent.appendChild(list);
    },

    projectFile(name) { // Add project to sidebar
        // Create Div and heading elements
        let div = document.createElement('div'); // Project container
        div.setAttribute('id', 'parent' + name);
        let hCont = document.createElement('div');//  Header container
        hCont.setAttribute('class', 'hedspace');
        let project = document.createElement('h3'); // Project header
        project.textContent = name;
        project.setAttribute('class', 'sideProjects');
        project.setAttribute('id', name);
        project.addEventListener('click', this.projectView);
        const editButton = document.createElement('img'); // Edit button
        editButton.setAttribute('id', 'edit' + name);
        editButton.setAttribute('data-id', 'p');
        editButton.setAttribute('class', 'dots'); 
        editButton.setAttribute('src', Dots);
        editButton.addEventListener('click', form.edit); 
        let list = document.createElement('ul');
        list.setAttribute('class', 'sideUl');
        list.setAttribute('id', 'sideUl' + name); 
        page.sidebar.appendChild(div);// Add elements to DOM 
        div.appendChild(hCont);
        hCont.appendChild(project);
        hCont.appendChild(editButton); 
        div.appendChild(list);
        page.updateViewBar(false, '', ''); // Clear current file view
    },
    // Deletes/Updates edited list files
    editedListFile(name, OGname, projName, OGprojName, index, hasMoved){
        // get list File
        let listFile = document.getElementById(index + OGname);
        let parent;
        if (hasMoved) { 
            parent = document.getElementById('sideUl' + OGprojName);
            parent.removeChild(listFile); // Orphan OG file
            display.listFile(name, projName); // Add new list to DOM 
            return;
        }
        // If has not moved, replace OG file data with new data
        parent = document.getElementById('sideUl' + projName);
        listFile.textContent = name;
        listFile.setAttribute('data-id', name);
        listFile.setAttribute('id', 'sideLi' + name);
        page.updateViewBar(false, '', ''); // Clear current file view
    }
};


const addNew = {
    project(e) { // Add project to memory
        page.stopSub(e);
        let projectName = page.fields.projectName.value; // Get Project name 
        
        // Validate project name
        if (!validate.name(projectName, projects, 'project', false)) return false; 

        //This line of code is not working properly
        form.dropProj(projectName)// Add project to dropdown
        projects.push(new Project (projectName, [])); // Add project to projects
        display.projectFile(projectName); // Add project to sidebar
        page.updateViewBar(false, '', ''); // Clear current file view
        page.hideAll(); // Reset Defaults
        page.clearForms();
    },

    list(e) { // Add list to memory
        page.stopSub(e);
        // Get list data from form
        let madeNewProject = window.getComputedStyle(page.fields.lProjectName).display === 'flex';
        let listName = page.fields.listName.value; // List name
        let dueDate = page.fields.dueDate.value; // Due date
        let elements = document.getElementsByClassName('formItem');
        let items = get.listItemValues(elements); // List items
        let projectName, listObj;

        // If creating new project
        if (madeNewProject){
            // Get & validate project name  
            projectName = page.fields.lProjectName.value; 
            if (!validate.name(projectName, projects, 'project', true)) return;
            
            // Add project to dropdown, 'projects' array, and sidebar
            form.dropProj(projectName);  
            projects.push(new Project (projectName, [])); 
            display.projectFile(projectName); //  

        } else { // If adding list to existing project 
            // Get project value from dropdown
            projectName = get.dropdownValue(page.fields.projDropdown);
            projectName = !projectName ? 'Miscellaneous' : projectName; 
        }
        let projectObj = get.project(projectName); // Get project object

        // Set priority default value & validate list Name
        let priority = get.dropdownValue(page.fields.priority) === '' ?  'normal' : get.dropdownValue(page.fields.priority); 
        if (!validate.name(listName, projectObj.lists, 'list', true)) return;
        
        listObj = new List (listName, dueDate, priority, items);// Construct new list
        projectObj.lists.push(listObj); // Add list to parent
        display.listFile(listName, projectName);// Add list to sidebar 
        page.updateViewBar(false, '', ''); // Clear current file view
        page.orphan('editLi', 'all-1', 'edit'); // Remove extra list fields
        page.show(page.buttons.selectProjects); // Restore dropdown
        page.hideAll();
        page.clearForms();
    },

    editedProject(e) { // When project edit form is submitted
        page.stopSub(e);
        // Update memory
        let newName = page.edit.projectName.value;
        let OGName = e.target.getAttribute('data-id');
        let index = get.projectIndex(OGName)
        projects[index].name = newName; // Update project in projects array

        // Update sidebar
        let OGfile = document.getElementById('parent' + OGName);
        page.sidebar.removeChild(OGfile); // Delete OG project file
        display.projectFile(newName); // Rebuild project file
        // Rebuild list files
        let listFiles = projects[index].lists;
        for (let i = 0; i < listFiles.length; i++) {
            display.listFile(listFiles[i].name, newName);
        }
        // remove og project from dropdown and add new
        form.dropProj(newName);
        form.rmDropProj(OGName);
        page.updateViewBar(false, '', ''); // Clear current file view
        page.clearForms();
        page.hideAll();
    },

    editedList(e) {  // Add edited list to memory
        page.stopSub(e);
        // Get OG list data from button 
        let listNameOG = e.target.getAttribute('data-id');
        let projNameOG = e.target.getAttribute('data-parent');
        let projObjOG = get.project(projNameOG);
        let listObjOG = get.list(listNameOG, projObjOG);

        // Get list data from form
        let projName, projObj; 
        let madeNewProj = window.getComputedStyle(page.edit.projectField).display === 'flex';
        let listName = page.edit.listName.value;
        let dueDate = page.edit.dueDate.value;
        let items = get.listItemValues(document.getElementsByClassName('editFormItem'));
        let priority = get.dropdownValue(page.edit.priority);
        // Blank fields default to OG values 
        listName = listName === '' ? listNameOG : listName;
        priority = priority === '' ? listObjOG.priority : priority;
        dueDate = dueDate === '' ? listObjOG.dueDate : dueDate;
        items = !items ? listObjOG.list : items;

        // If moving list to a newly created project
        if (madeNewProj){
            projName = page.edit.projectField.value;
            if (!validate.name(projName, projects, 'project', true)) return;

            form.dropProj(projName) // Add project to dropdown & projects
            projects.push(new Project (projName, []));
            display.projectFile(projName); // Update DOM
        
        // If list remains in OG project OR moving list to existing project
        } else {
            projName = get.dropdownValue(page.edit.projectDrop);
            projName = projName === '' ? projNameOG : projName;
        }
        let hasMoved = projName !== projNameOG;
        projObj = get.project(projName); // Get project object

        // Get OGlist index from OGproject to validate list name
        let index = get.listIndex(listNameOG, projObjOG);
        if (!validate.editedName(listName, projObj.lists, index)) return;
        let newList = new List (listName, dueDate, priority, items); // Make list
        
        // If list moved to new project
        if (hasMoved) { 
            // Add list to new Project AND Rm OG list from OG project
            projObj.lists.push(newList);
            projObjOG.lists.splice(index, 1); 
        // If list remains in OG project
        } else { 
            projObjOG.lists[index] = newList; // Replace OG list with new list
        }
        // Remove OG list from && add new list to sidebar
        display.editedListFile(listName, listNameOG, projName, projNameOG, index, hasMoved);
        page.updateViewBar(false, '', ''); // Clear current file view
        page.show(page.edit.projectDrop); // Reset to defaults
        page.orphan('editListItemParent', 'all-1', 'edit') // Orphan list items
        page.clearForms();// Clear edit form
        page.hideAll();
    }

};

// Events ////////////////////////////////////////////////////////
addIcon.addEventListener('click', display.add); // '+' icon menu display
page.modalShadow.addEventListener('click', display.shadowClick);
page.buttons.displayPForm.addEventListener('click', form.project); // Open list & project forms
page.buttons.displayLForm.addEventListener('click', form.list);
page.buttons.addItems.addEventListener('click', form.addListItem); // '+' & '-' list item
page.buttons.rmItems.addEventListener('click', form.rmListItem);
page.buttons.addList.addEventListener('click', addNew.list); // List & project form submission
page.buttons.addProject.addEventListener('click', addNew.project);
page.buttons.selectProjects.addEventListener('change', form.showProjInput); // Proj creation in list form
page.edit.projectDrop.addEventListener('change', form.showProjInput);// Proj creation in edit form 
page.edit.addItems.addEventListener('click', form.addListItem); // '+' & '-' list item (edit form)
page.edit.rmItems.addEventListener('click', form.rmListItem);
page.edit.listSubmit.addEventListener('click', addNew.editedList); // Edit form submission
page.edit.projectSubmit.addEventListener('click', addNew.editedProject);
page.edit.cancel.addEventListener('click', display.cancel);
page.edit.rmList.addEventListener('click', display.confirm); // Confirm deletion
page.edit.rmProject.addEventListener('click', display.confirm);
page.buttons.delCancel.addEventListener('click', display.cancel);
page.buttons.delConfirm.addEventListener('click', display.delete);


// Set Defaults
page.hideAll();
display.projectFile(misc.name);