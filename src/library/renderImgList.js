import { insertLast } from '@/library/insert';
import getPbImageURL from '@/api/getPbImageURL';

export async function renderImgList(collection, categoryName, node) {
  const records = await collection;
  let record = records.filter((item) => item.category == categoryName);

  record.forEach((item) => {
    const template = `
      <li class="swiper-slide">
        <picture>
          <source srcset="${getPbImageURL(item)}" media="max-width: 768px" />
          <source srcset="${getPbImageURL(item, 'tablet')}" media="(max-width: 1919px)" />
          <source srcset="${getPbImageURL(item, 'desktop')}"/>
          <img src="/img/logo.svg" alt="티빙 로고" />
        </picture>
      </li>
    `;
    insertLast(node, template);
  });
}

export async function renderImg(collection, userName) {
  const records = await collection;
  let record = records.filter((item) => item.username == userName);

  const template = `
    <img src="${getPbImageURL(record[0], 'mobile', 'avatar')}" alt="프로필" />
  `;
  return template;
}
