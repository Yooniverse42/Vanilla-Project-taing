import '@/styles/pages/profile.scss';
import '@/layout/footer';
import { renderProfileItem } from '@/layout/profile_item';
import { getNode } from '@/library/index';

renderProfileItem('edit');
const avatarsEditButton = getNode('.edit__button');

avatarsEditButton.addEventListener('click', () => {
  location.href = '/src/pages/profile_select/index.html';
});
