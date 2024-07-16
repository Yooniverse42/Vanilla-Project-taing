import getPbImageURL from '../api/getPbImageURL';
import { insertLast } from '../library/insert';

export function renderProfileItem(pageName) {
  console.log(pageName);
  const userData = JSON.parse(localStorage.getItem('user'));
  if (!userData) {
    location.href = '/src/pages/loginID/';
    return;
  }
  const { record } = userData;
  const newItem = {
    ...record,
    avatar: getPbImageURL(
      {
        ...record,
        avatar: [record.avatar],
      },
      'mobile',
      'avatar'
    ),
  };

  //임시 이미지
  const sbImg =
    'https://yooniverse.pockethost.io/api/files/gym9pmfmkdf9wtq/ofwswka8wstfz2x/profile_1_desktop_oGvDKxP3G9.png?token=';
  const bsImg =
    'https://yooniverse.pockethost.io/api/files/gym9pmfmkdf9wtq/s32k8bhcyayhd4d/profile_3_desktop_BHKRAb138M.png?token=';
  const ymImg =
    'https://yooniverse.pockethost.io/api/files/gym9pmfmkdf9wtq/dcbodtzpvpt5ulf/profile_2_desktop_ujnfC7hxCb.png?token=';

  const profiles = [
    { name: '슬비님', avatar: sbImg },
    { name: '범쌤', avatar: bsImg },
    { name: '야무', avatar: ymImg },
  ];

  [...profiles, newItem].forEach((item) => {
    const template = `    <figure class="avatar">
          <a href="/src/pages/${pageName === 'selectPage' ? 'taing' : 'register'}/index.html" class="edit__icon__container">
            <svg class="edit-icon" role="img" aria-label="편집 아이콘">
              <use href="/icons/stack.svg#${pageName === 'selectPage' ? 'profile-lock' : 'profile-pencil'}" />
            </svg>
          </a>
          <img
            class="avatar__picture"
            src=${item.avatar || sbImg}
            alt="프로필 아바타"
          />
          <figcaption class="avatar__name">${item.name}</figcaption>
        </figure>`;
    insertLast('.profile__picture__container', template);
  });
}
