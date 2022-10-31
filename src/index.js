import './style.css';
import './normalize.css';
import Add from './add.png';

// Add new

// Add icons to div
const iconContainer = document.getElementById('icon-cont');
// Add new list/project
const addIcon = document.createElement('img');
addIcon.setAttribute('class', 'icon');
addIcon.setAttribute('src', Add);
iconContainer.appendChild(addIcon);
addIcon.addEventListener('click', addNew);





