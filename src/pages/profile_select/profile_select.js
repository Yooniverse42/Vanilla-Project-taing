import '@/styles/pages/profile.scss';
import '@/layout/footer';
import { renderProfileItem } from '../../layout/profile_item';
import { getNode } from '../../library/getNode';
renderProfileItem('selectPage');

const avatarsContainer = getNode('.profile__picture__container');
avatarsContainer.addEventListener('click', goToTaing);

function goToTaing(e) {
  const target = e.target;
  console.log('target', target);
  if (!target.matches('.avatar')) return;
  location.href = '/src/pages/taing/index.html';
}
