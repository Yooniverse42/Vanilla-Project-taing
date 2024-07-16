import { insertLast } from '../library/insert';

export function renderProfileItem(pageName) {
  console.log(pageName);

  //임시 이미지
  const sbImg =
    'https://yooniverse.pockethost.io/api/files/gym9pmfmkdf9wtq/ofwswka8wstfz2x/profile_1_desktop_oGvDKxP3G9.png?token=';
  const bsImg =
    'https://yooniverse.pockethost.io/api/files/gym9pmfmkdf9wtq/s32k8bhcyayhd4d/profile_3_desktop_BHKRAb138M.png?token=';
  const ymImg =
    'https://yooniverse.pockethost.io/api/files/gym9pmfmkdf9wtq/dcbodtzpvpt5ulf/profile_2_desktop_ujnfC7hxCb.png?token=';
  const edImg =
    'https://yooniverse.pockethost.io/api/files/gym9pmfmkdf9wtq/5r0tzi5c3f1xq0s/profile_4_desktop_UuxTGhRfov.jpg?token=';

  const profiles = [
    { name: '슬비님', imgSrc: sbImg },
    { name: '범쌤', imgSrc: bsImg },
    { name: '야무', imgSrc: ymImg },
    { name: '이듬', imgSrc: edImg },
  ];

  profiles.forEach((item) => {
    const template = `    <figure class="avatar">
          <div class="edit__icon__container">
            <svg class="edit-icon" role="img" aria-label="편집 아이콘">
              <use href="/icons/stack.svg#${pageName === 'selectPage' ? 'profile-lock' : 'profile-pencil'}" />
            </svg>
          </div>
          <img
            class="avatar__picture"
            src=${item.imgSrc}
            alt="프로필 아바타"
          />
          <figcaption class="avatar__name">${item.name}</figcaption>
        </figure>`;
    insertLast('.profile__picture__container', template);
  });
}
