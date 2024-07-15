import { insertLast } from '@/library/insert';
import getPbImageURL from '@/api/getPbImageURL';

export async function renderImgList(collection, categoryName, node) {
  const records = collection.filter((item) => item.category == categoryName);

  records.forEach((item) => {
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
