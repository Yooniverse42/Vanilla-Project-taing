import { insertLast } from '@/library/insert';
import { renderProfileImg } from '@/library/renderImgList';

export async function renderProfileItem(movePage) {
  const userData = JSON.parse(localStorage.getItem('user'));
  if (!userData) {
    location.href = '/src/pages/loginID/';
    return;
  }

  const { record } = userData;
  const profiles = record.profiles || [];

  for (const [index, item] of profiles.entries()) {
    let href;
    if (movePage === 'main') {
      href = item.isLocked ? '/index.html' : '/src/pages/taing/index.html';
    } else if (movePage === 'edit') {
      href = '/src/pages/profile_edit_detail/index.html';
    } else {
      href = '/src/pages/profile_select/';
    }

    // 프로필 아이템의 기본 구조만 먼저 추가
    const template = `
      <figure class="avatar" data-index="${index}">
        <a href="${href}" class="avatar__picture__container ${item.isLocked ? 'is--locked' : ''}">
        </a>
        <figcaption class="avatar__name">${item.name}</figcaption>
      </figure>`;
    insertLast('.profile__picture__container', template);

    // 방금 추가한 figure의 a 태그를 선택
    const container = document.querySelector(
      `[data-index="${index}"] .avatar__picture__container`
    );
    await renderProfileImg(index + 1, item.name, container);
  }
}
