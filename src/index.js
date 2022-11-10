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
        this.hide(this.edit.newProject);
        this.hide(this.fields.lProjectName);
    },
    orphan(className, toDelete, type){ // Remove one or more items from DOM
        let elements = document.getElementsByClassName(className);
        if (!elements.length){ // If no elements of class 'className' exist
            return; 
        }
        let parent;
        if (type === 'tile') {
            parent = this.content;
        } else if (type === 'edit'){
            parent = document.getElementById('editFormListItems');
        } else {
            parent = document.getElementById('formListItems');
        }
        if (toDelete === "all") { // Remove all elements
            for (let i = elements.length; i >= 0; i--) {
                parent.removeChild(elements[i]);
            }
        } else if(toDelete === 1 && elements.length !== 1){ // Remove last item 
            console.log('elements[el.length - 1]:', elements[elements.length - 1]);
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
    },
    lastElement(className){
        console.log('className: ', className);
        let elements = document.getElementsByClassName(className);
        console.log('elements: ', elements);
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
    editName(name, array, OGindex){ // Validate list name from error form
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
    }, 
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
        page.orphan('listItemParent', 'all-1', 'list'); // Orphan list items from previous list
        page.show(page.listForm); // Display List form
    },

    edit(e) { // On '...' click
        let dataId = e.target.getAttribute('data-id');
        let name = e.target.getAttribute('id').slice(4);
        // If editing project
        if (dataId === 'p') { 
            page.edit.projectName.value = name;// Pre-fill form with OG name
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
        
        // Pre-fill form with list data
        this.selectDrop(dataId, page.edit.projectDrop); // Select project
        this.selectDrop(list.priority, page.edit.priority); // Select priority
        for (let i = 0; i < list.items.length; i++) { // Add list items to form
            let tempLI = this.addListItem('editLi');
            tempLI.setAttribute('value', list.items[i]);
            tempLI.checked = list.items[i].checked;
        }
        page.hideAll(); // Clear display
        page.editLForm.style.display = 'flex'; // Display edit list form
    },

    selectDrop(value, array) {
        for (let i = 0; i < array.length; i++) { // Select project
            if (value === array[i].value) {
                array[i].selected = true;
            }
        }
    },
    
    dropProj(name){ // add new project name to dropdown menu
        let parent = page.fields.projDropdown; // Dropdown parent container
        let temp = document.createElement('option');
        temp.setAttribute('class', 'addedProject');
        temp.setAttribute('value', name);
        temp.textContent = name;
        parent.appendChild(temp);
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
        console.log("entered addListItem");
        e !== 'editLi' ? page.stopSub(e) : e = e; // If accessed during pre-fill of edit form 
        // Set values based on form type
        let liClass, inputClass, inputId, parent; 
        if ( e.target.getAttribute('id') === 'addItems') { // For list form
            parent = page.listItemsOL;
            liClass = 'listItemParent';
            inputId = 'listItem'
            inputClass = 'formItem';
        } else { // For edit form
            parent = edit.listItems;
            liClass = 'eListItemParent';
            inputId = 'editListItem' //counter
            inputClass = 'editFormItem';
        }
        let lastElement = get.lastElement(liClass); // Get counter from last element
        let counter = lastElement.getAttribute('data-id');
        counter++;
        
        let tempLI = document.createElement('li'); // Add li to DOM 
        tempLI.setAttribute('data-id', counter);
        tempLI.setAttribute('class', 'listItemParent');
        let tempInput = document.createElement('input'); // Add input to DOM
        tempInput.setAttribute('class', inputClass);
        tempInput.setAttribute('type', 'text');
        tempInput.setAttribute('id', inputId + counter);
        tempLI.appendChild(tempInput);
        parent.appendChild(tempLI);
        if (e === 'editLi'){ // Return element if accessed in pre-fill of edit form 
            return tempLI;
        }
    },
};



const display = { // Display appropriate DOM object(s)
    shadowClick() { // Close all forms on shadow click
        page.hideAll();
        page.clearForms();
    },
    
    confirm() { // Displays modal confirming project or list deletion

    },

    add() { // On '+' icon click,
        page.show(page.modalShadow); // Display modal shadow & '+' menu
        page.show(page.dropdownCont);
    },

    listView(e) { // Show a single list
        page.stopSub(e);
        page.orphan('tile', 'all', 'tile'); // Orphan all tiles
        page.orphan('PVTile', 'all', 'tile');
        page.hideAll(); 

        let projectName = e.target.getAttribute('data-proj'); // Get project name
        let listName = e.target.getAttribute('data-Id'); // Get list name
        page.currentView.textContent = projectName + '  /  ' + listName; // Set header
        let projectObj = get.project(projectName); // Get project and list objects
        let listObj = get.list(listName, projectObj);

        // Dynamically create tile
        const tile = document.createElement('div'); // tile
        tile.setAttribute('class', 'tile')
        page.content.appendChild(tile);
        const tileTop = document.createElement('div'); // Top container
        tileTop.setAttribute('class', 'tileTop')
        const editButton = document.createElement('img'); // Edit button
        editButton.setAttribute('id', 'edit' + listName);
        editButton.setAttribute('data-id', 'edit' + projectName);
        editButton.setAttribute('class', 'dots'); 
        editButton.setAttribute('src', Dots);
        editButton.addEventListener('click', addNew.editedList);
        const headCont = document.createElement('div'); // Header container
        headCont.setAttribute('class', 'headContainer')
        const name = document.createElement('h2'); // Header
        name.setAttribute('class', 'listTitle')
        name.textContent = listName;
        const due = document.createElement('h5'); // Deadline
        due.setAttribute('class', 'deadline')
        due.textContent = listObj.dueDate;
        const checkCont = document.createElement('ol'); // List container
        checkCont.setAttribute('class', 'checkContainer')
        tile.appendChild(tileTop); // Add to DOM
        tileTop.appendChild(editButton); 
        tileTop.appendChild(headCont)
        headCont.appendChild(name);
        headCont.appendChild(due);
        tile.appendChild(checkCont);
        
        //Dynamically create list and checkboxes
        for (let i = 0; i < listObj.items.length; i++) {
            let tempLi = document.createElement('li'); // List item
            tempLi.setAttribute('class', 'lvcheckItem');
            let tempCheck = document.createElement('input'); // Checkbox
            tempCheck.setAttribute('type', 'checkbox');
            tempCheck.setAttribute('class', 'checkbox');
            tempCheck.setAttribute('name', listName + i);
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
        page.orphan('PVTile', 'all', 'tile');
        let projectName = e.target.getAttribute('id'); // Get project name
        page.currentView.textContent = projectName // Set header contents
        let projectObj = get.project(projectName); // Get project object
        
        for (let i = 0; i < projectObj.lists.length; i++) { // dynamically create PVTiles
            // Create tile elements
            let tile = document.createElement('div'); // Tile container
            tile.setAttribute('class', 'PVTile');
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
        list.textContent = listName; 
        list.setAttribute('data-proj', projectName); // Add data to element
        list.setAttribute('data-id', listName);
        list.setAttribute('class', 'sideLists');
        list.setAttribute('id', 'sideLi' + listName);
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
    }
};

const rm = {
    listFile(name, OGname, projName, hasMoved){
        let listFile = document.getElementById('sideLi' + OGname)
        let parent = document.getElementById('sideUl' + projName)
        if (hasMoved) { // Orphan OG file
            parent.removeChild(listFile);
            return;
        }
        // If has not moved, replace OG file data with news
        listFile.textContent = name; 
        listFile.setAttribute('data-id', name);
        listFile.setAttribute('id', 'sideLi' + name);
    }
};

const addNew = {
    listProj(e) { // Adding new project from list form to memory
        page.stopSub(e);
        // Show project name field 
        if (e.target.options[e.target.selectedIndex].text === 'New project'){
            page.show(page.fields.lProjectName);
            page.hide(page.buttons.selectProjects);
        }
    },

    project(e) { // Add project to memory
        page.stopSub(e);
        let projectName = page.fields.projectName.value; // Get Project name 

        if (!validate.name(projectName, projects, 'project', false)){
            return false; // Validate project name
        }

        form.dropProj(projectName)// Add project to dropdown
        projects.push(new Project (projectName, [])); // Add project to projects
        display.projectFile(projectName); // Add project to sidebar
        page.hideAll();
        page.clearForms();
    },

    list(e) { // Add list to memory
        page.stopSub(e);
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
            form.dropProj(projectName) // Add project to dropdown 
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
        display.listFile(listName, projectName);// Add list to sidebar 
        page.orphan('editLi', 'all-1', 'edit'); // Remove extra list fields
        page.show(page.buttons.selectProjects); // Restore dropdown
        page.hideAll();
        page.clearForms();
    },

    editedProject() { // when project edit form is submitted
        // 
    },

    editedList() {  // Add edited list to memory
        page.stopSub(e); // ('id', 'edit' + listName)('data-id', 'edit' + projectName);
        // Get OG list data from button 
        let listName = e.target.getAttribute('data-id').slice(4);
        let projectName = e.target.getAttribute('data-parent').slice(4);
        let projectObj = get.project(projectName);
        let listObj = get.list(listName, projectObject);

        // Get list data from form
        let hasMoved = window.getComputedStyle(page.edit.newProject).display === 'flex';
        let newListName = page.edit.listName.value;
        let newDueDate = page.edit.dueDate.value;
        let listElements = document.getElementsByClassName('editFormItem');
        let newProjectName, newProjectObj;
        let newItems = []; 

        // If adding a new project
        if (hasMoved){
            newProjectName = page.edit.newProject.value; // Validate project name
            if (!validate.name(newProjectName, projects, 'project', true)) {
                return;
            }
            form.dropProj(newProjectName) // Add project to dropdown & projects
            newProjectObj = new Project (newProjectName, [])
            projects.push(newProjectObj);
            display.projectFile(newProjectName); // Update DOM
        // Else, get project name from dropdown menu
        } else { 
            newProjectName = get.dropdownValue(page.edit.projectDrop);
            newProjectName = newProjectName === '' ? projectName : newProjectName;
            newProjectObj = get.project(newProjectName); // Get project object
        }
        let newPriority = get.dropdownValue(page.edit.priority); // Get priority

        if (!listElements.length) { // Default to OG list if form contains no list items
            newItems = listObj.list; 
        } else { // Else get list from form
            for (let i = 0; i < listElements.length; i++) { 
                let tempItem = listElements[i].value;
                newItems.push({name: tempItem, isChecked: false});
            }
        }

        // Blank fields default to OG values 
        newPriority = newPriority === '' ? listObj.priority : newPriority;
        newDueDate = newDueDate === '' ? listObj.dueDate : newDueDate;
        newListName = newListName === '' ? listName : newListName;

        let index = get.listIndex(listName, projectObj)// Get OG list index from OG project
        editName(newListName, newProjectObj.lists, index); // Ensure new list name is unique
        let newList = new List (newListName, newDueDate, newPriority, newItems); // Make list
        
        if (newProjectName !== projectName) {// If list moved to new project
            newProjectObj.lists.push(newList);
            newProjectObj.lists.splice(index, 1); // Rm OG list from OG project
            display.listFile(newListName, newProjectName); // Add list to DOM 
        } else { // If list remains in OG project
            projectObj.lists[index] = newList; // Replace OG list with new list
        }
        rm.listFile(newListName, listName, projectName, hasMoved)  // Remove OG list from DOM
        page.show(page.edit.projectDrop); // Reset to defaults
        page.clearForms();
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
page.buttons.selectProjects.addEventListener('change', addNew.listProj); // Proj creation in list form
page.edit.addItems.addEventListener('click', form.addListItem); // '+' & '-' list item (edit form)
page.edit.rmItems.addEventListener('click', form.rmListItem); //UNICORN
page.edit.listSubmit.addEventListener('click', form.edit); // Edit form submission
page.edit.projectSubmit.addEventListener('click', form.edit);


// Set Defaults
page.hideAll();
display.projectFile(misc.name);