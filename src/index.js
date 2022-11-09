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
        project: document.getElementById('editProjName'),// pform
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
    valueFromDropdown(dropDownArray){ 
        // Get value from dropdown menu
        for (let i = 0; i < dropDownArray.length; i++) {
            if (dropDownArray[i].selected === true) { 
                return dropDownArray[i].value;
            }
        }
        return false;
    }
};

const update = {
    isCheckedStatus(e) {
        let checked; // Check if box is checked
        e.target.checked ? checked = true : checked = false;
        // Get project > get list > get list item
        let projectObject = get.project(e.target.getAttribute('data-id'));
        let nameID = e.target.getAttribute('name');
        let listName = nameID.slice(0, (nameID.length - 1));
        let itemIndex = nameID.slice(nameID.length - 1);
        let listObject = get.list(listName, projectObject);
        listObject.items[itemIndex].isChecked = checked; // Update check status
    }
};

const display = { // Display appropriate form
    shadowClick() {
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
        // Hide shadow & dropdown buttons
        page.hide(page.modalShadow);
        page.hide(page.dropdownCont);

        // Orphan additional list items from previous list
        while (page.listCounter > 1) {
            // Orphan last added list item 
            let lastItem = document.getElementById('li' + page.listCounter);
            page.listItemsOL.removeChild(lastItem);
            page.listCounter--; // decrement list counter
        }
        
        // Display List form
        page.show(page.listForm); 
    },
    editForm(e) {
        let dataId = e.target.getAttribute('data-id');
        if (dataId === 'p') {
            // get project data
            // load into edit project form
            // open edit project form
            // return
        } 
        // Get list data 
        let projObj = get.project(dataId);
        let listName = e.target.getAttribute('id').slice(4);
        let list = get.list(listName, projObj);
        // Add parent and list names to submit button
        page.edit.listSubmit.setAttribute('data-id', 'edits' + listName);
        page.edit.listSubmit.setAttribute('data-parent', 'edits' + dataId);
        // Load list data into edit list form
        page.edit.dueDate.setAttribute('value', listName);
        page.edit.listName.setAttribute('value', list.dueDate); // later fix for library dueDate
        // Select project name in dropdown
        for (let i = 0; i < page.edit.priority.length; i++) {
            if (dataId === page.edit.projectDrop[i].value) {
                page.edit.projectDrop[i].selected = true;
            }
        }
        // Select priority value from dropdown
        for (let i = 0; i < page.edit.priority.length; i++) {
            if (list.priority === page.edit.priority[i].value) {
                page.edit.priority[i].selected = true;
            }
        }
        // Add list items
        for (let i = 0; i < list.items.length; i++) { 
            let tempLI = addNew.listItem('editLi');
            tempLI.setAttribute('value', list.items[i]);
            tempLI.checked = list.items[i].checked;
        }
        // Reset defaults
        hideAll();
        clearForms();
        page.editLForm.style.display = 'flex'; // Display edit list form
        // reset form list fields
        rmAllLi('editLi');
        // return
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
        editButton.addEventListener('click', addNew.projEdit);
        tileTop.appendChild(dots); // either tile or headingDiv !!!!!
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
    rmListFile(listName, newFolder, OGFolder, index) {
        if (newFolder === 1){ // if list has been renamed
        //      orphan OG folder
        //      rebuild OG folder
        } else if (!newFolder) { // if deleting list
        //      rebuild OG folder
        //      return
        } // if list has moved to new folder
            //rebuild OG folder;
    },
    // rmProjFile (newFolder, oldFolder) {
    //     //  if renaming project
    //     //      build new project file
    //     //      orphan OG project file
    //     //  if deleting project
    //     //      if project has any list children
    //     //          display warning message
    //     //      else
    //     //          orphan project file
    // },
    // else if (click edit) {
        // load list tile into form areas
        // display edit form
        // }
    listView(e) {
        // Orphan all tiles
        console.log('entered listView');
        page.orphan(document.getElementsByClassName('tile'));
        page.orphan(document.getElementsByClassName('PVTile'));

        // Get button data
        addNew.stopSub(e);
        page.hideAll();
        let projectName = e.target.getAttribute('data-Id');
        let listName = e.target.getAttribute('id');
        // Set header contents
        page.currentView.textContent = projectName + '  /  ' + listName;
        // Get project object and list data
        let projectObj = get.project(projectName);
        let listData = get.list(listName, projectObj);

        // Dynamically create tile
        const tile = document.createElement('div'); 
        tile.setAttribute('class', 'tile')
        page.content.appendChild(tile);
        const tileTop = document.createElement('div');
        tileTop.setAttribute('class', 'tileTop')
        tile.appendChild(tileTop);
        const editButton = document.createElement('img'); // EDIT BUTTON TO LIST
        editButton.setAttribute('id', 'edit' + listName);
        editButton.setAttribute('data-id', 'edit' + projectName);
        editButton.setAttribute('class', 'icon'); 
        editButton.setAttribute('src', Dots);
        editButton.addEventListener('click', addNew.listEdit);
        tileTop.appendChild(dots); // either tile top or headCont !!!!!
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

        const checkCont = document.createElement('ol');
        checkCont.setAttribute('class', 'checkContainer')
        tile.appendChild(checkCont);

        //Dynamically create list and checkboxes
        for (let i = 0; i < listData.items.length; i++) {
            let tempLi = document.createElement('li');
            tempLi.setAttribute('class', 'lvcheckItem');
            let tempCheck = document.createElement('input');
            tempCheck.setAttribute('type', 'checkbox');
            tempCheck.setAttribute('class', 'checkbox');
            tempCheck.setAttribute('name', listName + i);
            tempCheck.setAttribute('data-id', projectName);
            if (listData.items[i].isChecked) {
                tempCheck.checked = true;
            }
            tempCheck.addEventListener("change", update.isCheckedStatus);
            let tempItem = document.createElement('p');
            tempItem.setAttribute('class', 'listItem');
            tempItem.setAttribute('id', 'listIndex' + i);
            tempItem.textContent = listData.items[i].name;
            // Add to DOM
            checkCont.appendChild(tempLi);
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
    editName(name, array, OGindex){
        let errorMessage;
        
        for (let i = 0; i < array.length; i++){
            if (i != OGindex && array[i].name.toLowerCase()  === name.toLowerCase()) { // Name is not unique
                errorMessage.style.display = 'block';
                errorMessage.textContent = 'ERROR: A list' + ' with the name \"' + name + '\" already exists for this project.';
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

    //  Add list item
    listItem(e) {
        e !== 'editLi' ? addNew.stopSub(e): e = e;
        let liId; // Set id values based on form type
        let inputId;
        let parent;
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
        tempInput.setAttribute('class', 'formItem')
        tempInput.setAttribute('type', 'text')
        tempInput.setAttribute('id', inputId)
        tempLI.appendChild(tempInput);
        parent.appendChild(tempLI);
        if (e === 'editLi'){ // return element if accessed in edit form generation
            return tempLI;
        }
    },
    // Remove all list items
    rmAllLi(id){ // rewrite this to include list form elements
        while (page.editLCounter > 1) {
            this.rmListItem(id);
            page.editLCounter--;
        }
    },

    // Remove list item
    rmListItem (e) { 
        e !== 'editLi' ? addNew.stopSub(e): e = e;
        let liId; // Set values based on form type
        let parent;
        if (e === 'editLi' || e.target.getAttribute('id')[0] === 'e') { // For edit form
            // Ensure minimum list length
            if (page.editLCounter < 2) {
                return;
            }
            liId = 'editLi' + page.editLCounter;
            parent = edit.listItems;
            // decrement counter
            page.editLCounter--;
        } else { // For list form
            // Ensure minimum list length
            if (page.listCounter < 2) {
                return;
            }
            liId = 'li' + page.listCounter;
            parent = page.listItemsOL;
            // decrement counter
            page.listCounter--;
        }
        // Find last added list item 
        let lastItem = document.getElementById(liId);
        // Orphan last list item
        parent.removeChild(lastItem);
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
            projectName = get.valueFromDropdown(page.fields.projDropdown);
            projectName = !projectName ? 'Miscellaneous' : projectName; // Default to miscellaneous 
        }
        parentProject = get.project(projectName); // Get project object

        if (!validate.name(listName, parentProject.lists, 'list', 'list')){ // Validate list Name
            return;
        } 

        // Get list items from list elements array
        for (let i = 0; i < elements.length; i++) { 
            let tempItem = elements[i].value;
            items.push({name: tempItem, isChecked: false});
        }
        
        priority = get.valueFromDropdown(page.fields.priority); // Get priority value
        priority === '' ? priority = 'normal' : priority = priority; // Default to OG value
        
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

        // Get list data from DOM
        let newListName = page.edit.listName.value; //"editAllProjects"
        let newDueDate = page.edit.dueDate.value;
        let listElements = document.getElementsByClassName('editFormItem');
        let newProjectName;
        let newProjectObj;
        let newItems = []; 

        // Get parent project name 
        if (window.getComputedStyle(page.edit.newProject).display === 'flex'){
            // If adding a new project
            newProjectName = page.edit.newProject.value;
            // Validate project name
            if (!validate.name(newProjectName, projects, 'list', 'project')){
                return;
            }
            // Add new project to dropdown form, projects array & update DOM
            addNew.dropProj(newProjectName)
            newProjectObj = new Project (newProjectName, [])
            projects.push(newProjectObj);
            display.projectFile(newProjectName); 

        } else { // Get project name from dropdown menu
            newProjectName = get.valueFromDropdown(page.edit.projectDrop);
            newProjectName = newProjectName === '' ? projectName : newProjectName; // Default to OG value
            newProjectObj = get.project(newProjectName); // Get project object
        }

        let newPriority = get.valueFromDropdown(page.edit.priority); // Get priority value

        // Blank fields default to OG values 
        newPriority = newPriority === '' ? listObj.priority : newPriority;
        newDueDate = newDueDate === '' ? listObj.dueDate : newDueDate;
        newListName = newListName === '' ? listName : newListName;
        
        // If list item fields are blank
        if (!listElements) { 
            newItems = listObj.list; // Default to OG list
        } else { 
            // Get list from list elements array
            for (let i = 0; i < listElements.length; i++) { 
                let tempItem = listElements[i].value;
                newItems.push({name: tempItem, isChecked: false});
            }
        }

        // Get index of OG list from OG project
        let index = get.listIndex(listName, projectObj)
        
        editName(newListName, newProjectObj.lists, index); // Ensure new list name is unique
        let newList = new List (newListName, newDueDate, newPriority, newItems); // Construct new list

        // If list moved to new project
        if (newProjectName !== projectName) {
            newProjectObj.lists.push(newList); // Add new list to project
            newProjectObj.lists.splice(index, 1); // Rm OG list from OG project
            display.rmListFile(listName, newProjectObj, projectObj, index) // Remove OG list from DOM
            display.listFile(newListName, newProjectName); // Add edited list to DOM 
        
        } else { // If list remains in OG project
            projectObj.lists[index] = newList; // Replace OG list with new list
            display.rmListFile(listName, 1, projectObj, index) // Remove OG list from DOM
        }

        // Reset to defaults
        page.editLCounter = 1;
        page.show(page.buttons.editSelectProjects);
        page.clearForms();
        page.hideAll();
    }
};


// Events ////////////////////////////////////////////////////////
page.modalShadow.addEventListener('click', display.shadowClick);
page.buttons.add.addEventListener('click', display.add);
page.buttons.displayPForm.addEventListener('click', display.projectForm);
page.buttons.displayLForm.addEventListener('click', display.listForm);
page.buttons.addItems.addEventListener('click', addNew.listItem);
page.buttons.rmItems.addEventListener('click', addNew.rmListItem); 
page.buttons.addList.addEventListener('click', addNew.list);
page.buttons.addProject.addEventListener('click', addNew.project);
page.buttons.selectProjects.addEventListener('change', addNew.listProj);
page.edit.addItems.addEventListener('click', addNew.listItem);
page.edit.rmItems.addEventListener('click', addNew.rmListItem);
page.edit.listSubmit.addEventListener('click', display.editForm);
page.edit.projectSubmit.addEventListener('click', display.editForm);

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