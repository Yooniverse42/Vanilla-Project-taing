import '@/styles/pages/profile.scss';
import '@/layout/footer';

import { renderProfileItem } from '../../layout/profile_item';
import { getNode } from '../../library/getNode';

renderProfileItem('editPage');
const avatarsContainer = getNode('.profile__picture__container');
avatarsContainer.addEventListener('click', saveAvatarInfo);

function saveAvatarInfo(e) {
  const target = e.target;
  console.log('target', target);
  if (!target.matches('.avatar')) return;
  const imgSrc = target.children[1].src;
  const name = target.children[2].textContent;

  localStorage.setItem('profileInfo', JSON.stringify({ name, imgSrc }));
  location.href = '/src/pages/profile_edit_detail/index.html';
}
