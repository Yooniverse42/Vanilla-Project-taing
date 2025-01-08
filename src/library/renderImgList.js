import { insertLast } from '@/library/insert';
import getPbImageURL from '@/api/getPbImageURL';
import { getRecords } from '@/api/getRecords';

export async function renderImgList(collection, categoryName, node) {
  const records = await collection;
  let record = records.filter((item) => item.category == categoryName);

  record.forEach((item) => {
    if (item.photo.length === 1) {
      const template = `
      <li class="swiper-slide">
        <img src="${getPbImageURL(item)}" alt="${item.title}" />
      </li>
      `;
      insertLast(node, template);
    } else {
      const template = `
      <li class="swiper-slide">
        <picture>
          <source srcset="${getPbImageURL(item, 'tablet')}" media="(min-width: 768px) and (max-width: 1279px)" />
          <source srcset="${getPbImageURL(item, 'desktop')}" media="(min-width: 1280px)"/>
          <img src="${getPbImageURL(item)}" alt="${item.title}" />
        </picture>
      </li>
    `;
      insertLast(node, template);
    }
  });
}

export async function renderSearchList(
  collection,
  categoryName,
  node,
  searchValue
) {
  const records = await getRecords(collection, {
    filter: `category='${categoryName}' && title~'${searchValue}'`,
  });

  records.forEach((item) => {
    const template = `
    <li>
      <figure>
        <picture>
          <source srcset="${getPbImageURL(item, 'tablet')}" media="(min-width: 768px) and (max-width: 1279px)" />
          <source srcset="${getPbImageURL(item, 'desktop')}" media="(min-width: 1280px)"/>
          <img src="${getPbImageURL(item)}" alt="${item.title}" />
        </picture>
        <figcaption>${item.title}</figcaption>
      </figure>
    </li>
  `;
    insertLast(node, template);
  });
}
