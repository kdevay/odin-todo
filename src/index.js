import './style.css';
import './normalize.css';
import Add from './add.png';
import Bell from './bell.png';
import Noti from './noti.png';

const iconContainer = document.getElementById('icon-cont');
// Add icons to div

// const menuImage = document.createElement('img');// image
// menuImage.setAttribute('id', 'mlogo');
// menuImage.setAttribute('src', CafeLogo);
// menuTab.appendChild(menuImage);

const addIcon = document.createElement('img');
addIcon.setAttribute('class', 'icon');
addIcon.setAttribute('src', Add);
iconContainer.appendChild(addIcon);

const bellIcon = document.createElement('img');
bellIcon.setAttribute('class', 'icon');
bellIcon.setAttribute('src', Bell);
iconContainer.appendChild(bellIcon);

const notiIcon = document.createElement('img');
notiIcon.setAttribute('class', 'icon');
notiIcon.setAttribute('src', Noti);
iconContainer.appendChild(notiIcon);

counter++;




