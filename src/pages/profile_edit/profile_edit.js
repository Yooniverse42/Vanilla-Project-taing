import '@/styles/pages/profile.scss';
import '@/layout/footer';
import { renderProfileItem } from '@/layout/profile_item';
import { getNode, getNodes } from '@/library/getNode';

renderProfileItem('edit');
const avatarsPictures = getNodes('.avatar__picture__container');
const avatarsContainer = getNode('.profile__picture__container');
const avatarsEditButton = getNode('.edit__button');
const { profiles } = JSON.parse(localStorage.getItem('user')).record;

// 개인 프로필 편집 페이지 이동
function goToEdit(e) {
  const target = e.target;
  const img = target.querySelector('img');

  if (!img) return;

  const imgSrc = img.src;
  const name = img.alt.replace('의 프로필', '');
  const currentProfile = profiles.find((item) => item.name === name);
  const pw = currentProfile?.lockPassword || null;

  localStorage.setItem('currentProfile', JSON.stringify({ pw, imgSrc, name }));
}
avatarsContainer.addEventListener('click', goToEdit);

function editPage() {
  avatarsPictures.forEach((avatar) => {
    if (avatar.classList.contains('is--locked')) {
      avatar.classList.remove('is--locked');
      avatar.classList.add('is--edit');
    } else {
      avatar.classList.add('is--edit');
    }
  });
}
editPage();

avatarsEditButton.addEventListener('click', () => {
  location.href = '/src/pages/profile_select/index.html';
});
