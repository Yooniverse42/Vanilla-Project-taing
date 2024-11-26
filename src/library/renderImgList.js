import { insertLast } from '@/library/insert';
import getPbImageURL from '@/api/getPbImageURL';
import { getRecord } from '@/api/getRecords';

export async function renderImgList(collection, categoryName, node) {
  const records = await collection;
  let record = records.filter((item) => item.category == categoryName);

  record.forEach((item) => {
    const template = `
      <li class="swiper-slide">
        <picture>
          <source srcset="${getPbImageURL(item)}" media="(max-width: 767px)" />
          <source srcset="${getPbImageURL(item, 'tablet')}" media="(min-width: 768px) and (max-width: 1279px)" />
          <source srcset="${getPbImageURL(item, 'desktop')}" media="(min-width: 1280px)"/>
          <img src="/img/logo.svg" alt="티빙 로고" />
        </picture>
      </li>
    `;
    insertLast(node, template);
  });
}

export async function renderProfileImg(profileNumber, avatarName, container) {
  const records = await getRecord('profile', `name='profile${profileNumber}'`);
  const item = records.items[0];

  if (!item) return;

  const template = `
    <picture>
      <source srcset="${getPbImageURL(item, 'tablet')}" media="(min-width: 768px) and (max-width: 1279px)" />
      <source srcset="${getPbImageURL(item, 'desktop')}" media="(min-width: 1280px)"/>
      <img 
        class="avatar__picture"
        src="${getPbImageURL(item)}"
        alt="${avatarName}의 프로필" 
      />
    </picture>
  `;

  container.innerHTML = template;
}

export async function getProfileImg(
  profileNumber,
  breakpoint = 'mobile',
  fileName = 'photo'
) {
  const records = await getRecord('profile', `name=profile${profileNumber}`);
  const item = records.items[0];

  if (!item) return null;

  if (breakpoint === 'mobile')
    return `${import.meta.env.VITE_PB_API}/files/${item.collectionId}/${item.id}/${item[fileName][0]}`;
  if (breakpoint === 'tablet')
    return `${import.meta.env.VITE_PB_API}/files/${item.collectionId}/${item.id}/${item[fileName][1]}`;
  if (breakpoint === 'desktop')
    return `${import.meta.env.VITE_PB_API}/files/${item.collectionId}/${item.id}/${item[fileName][2]}`;
}
