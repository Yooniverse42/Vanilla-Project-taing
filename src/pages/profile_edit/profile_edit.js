import '@/styles/pages/profile.scss';
import '@/layout/footer';

import { renderProfileItem } from '@/layout/profile_item';
import { getNode } from '@/library/getNode';

// renderProfileItem('editPage');
renderProfileItem('edit');
const avatarsContainer = getNode('.profile__picture__container');
avatarsContainer.addEventListener('click', saveAvatarInfo);

//클릭한 아이템의 이름, 이미지 주소를 로컬 스토리지에 저장 후 이동
function saveAvatarInfo(e) {
  const target = e.target;
  console.log('target', target);
  if (!target.matches('.avatar')) return;
  const imgSrc = target.children[1].src;
  const name = target.children[2].textContent;

  localStorage.setItem('profileInfo', JSON.stringify({ name, imgSrc }));
  location.href = '/src/pages/profile_edit_detail/index.html';
}
