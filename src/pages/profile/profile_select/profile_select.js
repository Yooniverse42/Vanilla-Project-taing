import '@/styles/pages/profile.scss';
import '@/layout/index';
import { renderProfileItem } from '@/pages/profile/profile_item';
import { getNode, getNodes, insertLast } from '@/library/index';
import gsap from 'gsap';

function renderAddProfileButton() {
  const avatars = getNodes('.avatar');
  if (avatars.length < 4) {
    const addButtonTemplate = `
      <figure class="avatar avatar__add__button">
        <a href="/src/pages/profile/profile_create/index.html" class="avatar__picture__container add__profile">
          <span class="sr-only">프로필 추가하기</span>
        </a>
        <figcaption class="avatar__name">프로필 추가</figcaption>
      </figure>
    `;

    insertLast('.profile__picture__container', addButtonTemplate);

    const addProfileButton = getNode('.avatar__add__button');
    gsap.fromTo(addProfileButton, { scale: 0 }, { scale: 1 });
    addProfileButton.addEventListener('mouseenter', () => {
      gsap.to(addProfileButton, { y: -20 });
    });
    addProfileButton.addEventListener('mouseleave', () => {
      gsap.to(addProfileButton, { y: 0 });
    });
  }
}

// 메인 초기화 함수
async function initializePage() {
  await renderProfileItem('main');
  renderAddProfileButton();
}

initializePage();
