import '@/styles/pages/profile.scss';
import '@/layout/footer';
import { renderProfileItem } from '../../layout/profile_item';
import { getNode } from '../../library/getNode';
renderProfileItem('selectPage');

const avatarsContainer = getNode('.profile__picture__container');
avatarsContainer.addEventListener('click', goToTaing);

//타잉 페이지로 이동
function goToTaing(e) {
  const target = e.target;
  console.log('target', target);
  if (!target.matches('.avatar')) return;

  const imgSrc = target.children[1].src;
  const name = target.children[2].textContent;

  localStorage.setItem('profileInfo', JSON.stringify({ name, imgSrc }));

  location.href = '/src/pages/taing/index.html';
}
