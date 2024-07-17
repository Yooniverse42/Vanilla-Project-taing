import getPbImageURL from '../api/getPbImageURL';
import { insertLast } from '../library/insert';

export function renderProfileItem(pageName) {
  const defaultImage = '/image/avatar2.png';
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

  const profiles = [
    { name: '슬비님', avatar: '/image/defaultavatar1.png' },
    { name: '범쌤', avatar: '/image/defaultavatar2.png' },
    { name: '야무', avatar: '/image/defaultavatar3.png' },
  ];
  // /src/pages/${pageName === 'selectPage' ? 'taing' : 'profile_edit_detail'}/index.html
  [...profiles, newItem].forEach((item) => {
    const template = `    <figure class="avatar">

           <a href="#" class="edit__icon__container">
            <svg class="edit-icon" role="img" aria-label="편집 아이콘">
              <use href="/icons/stack.svg#${pageName === 'selectPage' ? 'profile-lock' : 'profile-pencil'}" />
            </svg>
          </a>
          <img
            class="avatar__picture"
            src=${item.avatar || defaultImage}
            alt="프로필 아바타"
          />
          <figcaption class="avatar__name">${item.name}</figcaption>
        </figure>`;
    insertLast('.profile__picture__container', template);
  });
}
