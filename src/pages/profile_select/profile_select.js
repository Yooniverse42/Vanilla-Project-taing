import '@//pages/profile_select/profile.scss';
import '@/layout/footer';
import { renderProfileItem } from '@/layout/profile_item';
import { getNode, getNodes } from '@/library/getNode';
renderProfileItem('main');

const title = getNode('.header__title__container');
const avatarsContainer = getNode('.profile__picture__container');
const avatarsPictures = getNodes('.avatar__picture__container');
const avatarsEditButton = getNode('.edit__button');
const avatarsAddButton = getNode('.add__button');

// 프로필 편집 (전체 페이지)
function editPage() {
  // 기존 프로필 아이템들을 지우고
  avatarsContainer.innerHTML = '';

  // 편집 모드로 다시 렌더링
  renderProfileItem('edit');

  title.innerHTML = `프로필 편집
  <p>편집할 프로필을 선택해 주세요.</p>`;

  avatarsPictures.forEach((avatar) => {
    if (avatar.classList.contains('is--locked')) {
      avatar.classList.remove('is--locked');
      avatar.classList.add('is--edit');
    } else {
      avatar.classList.add('is--edit');
    }
  });
}
avatarsEditButton.addEventListener('click', editPage);

// 프로필 추가
function addAvatar() {
  console.log('확인');
  // location.href = ''; // 생성해야함
  // profiles 배열에 추가되게 addProfile() 함수 사용
}
avatarsAddButton.addEventListener('click', addAvatar);

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
avatarsContainer.addEventListener('click', goToTaing);
