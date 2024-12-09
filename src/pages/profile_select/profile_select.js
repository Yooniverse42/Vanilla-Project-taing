import '@/styles/pages/profile.scss';
import '@/layout/footer';
import { renderProfileItem } from '@/layout/profile_item';
import { getNode, getNodes, insertLast } from '@/library/index';
import gsap from 'gsap';

const avatarsEditButton = getNode('.edit__button');

function renderAddProfileButton() {
  const avatars = getNodes('.avatar');
  if (avatars.length < 4) {
    const addButtonTemplate = `
      <figure class="avatar avatar__add__button">
        <a href="/src/pages/profile_create/index.html" class="avatar__picture__container add__profile">

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

// 프로필 편집 (전체 페이지)
function editPage() {
  location.href = '/src/pages/profile_edit/index.html';
}
avatarsEditButton.addEventListener('click', editPage);
