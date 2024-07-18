import '@/styles/pages/popUp.scss';
import '@/layout/index';
import { getNode } from '@/library/index';
const popUp = getNode('.popup__container');
const todayCloseButton = getNode('.today');
const closeButton = getNode('.close');

todayCloseButton.addEventListener('click', () => {
  popUp.style.display = 'none';
  location.href = '/src/pages/taing/index.html';
});
closeButton.addEventListener('click', () => {
  popUp.style.display = 'none';
  location.href = '/src/pages/taing/index.html';
});

