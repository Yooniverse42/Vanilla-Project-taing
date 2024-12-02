import '@/styles/pages/profile.scss';
import '@/layout/footer';
import { renderProfileItem } from '@/layout/profile_item';
import { getNode } from '@/library/getNode';
renderProfileItem('main');

const avatarsContainer = getNode('.profile__picture__container');
const avatarsEditButton = getNode('.edit__button');
const dialog = getNode('.dialog__container');
const dialogCancelButton = getNode('.dialog__exit__button');

const { profiles } = JSON.parse(localStorage.getItem('user')).record;

// 프로필 편집 (전체 페이지)
function editPage() {
  location.href = '/src/pages/profile_edit/index.html';
}
avatarsEditButton.addEventListener('click', editPage);

//타잉 페이지로 이동
function goToTaing(e) {
  const target = e.target;
  const img = target.querySelector('img');
  if (!img) return;

  const imgSrc = img.src;
  const name = img.alt.replace('의 프로필', '');
  const currentProfile = profiles.find((item) => item.name === name);
  const pw = currentProfile?.lockPassword || null;

  localStorage.setItem('currentProfile', JSON.stringify({ pw, imgSrc, name }));
}
avatarsContainer.addEventListener('click', goToTaing);

// dialog 닫기
dialogCancelButton.addEventListener('click', () => {
  dialog.close();
});

dialog.addEventListener('cancel', () => {
  dialog.close();
});
