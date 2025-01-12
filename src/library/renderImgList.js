import { insertLast } from '@/library/insert';
import getPbImageURL from '@/api/getPbImageURL';
import { getRecords } from '@/api/getRecords';

export async function renderImgList(
  collection,
  categoryName,
  node,
  sortField = null
) {
  const records = await collection;
  let record = records.filter((item) => item.category == categoryName);

  if (sortField) {
    record = record.sort((a, b) => a[sortField] - b[sortField]);
  }

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
        <a href="javascript:void(0)">
          <picture>
            <source srcset="${getPbImageURL(item, 'tablet')}" media="(min-width: 768px) and (max-width: 1279px)" />
            <source srcset="${getPbImageURL(item, 'desktop')}" media="(min-width: 1280px)"/>
            <img src="${getPbImageURL(item)}" alt="${item.title}" />
          </picture>
        </a>
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
  searchValue = false
) {
  const filter = searchValue
    ? `category='${categoryName}' && title~'${searchValue}'`
    : `category='${categoryName}'`;
  const records = await getRecords(collection, { filter });

  records.forEach((item) => {
    const template = `
    <li class="swiper-slide">
      <a href="javascript:void(0)">
        <figure>
          <picture>
            <source srcset="${getPbImageURL(item, 'tablet')}" media="(min-width: 768px) and (max-width: 1279px)" />
            <source srcset="${getPbImageURL(item, 'desktop')}" media="(min-width: 1280px)"/>
            <img src="${getPbImageURL(item)}" alt="${item.title}" />
          </picture>
          <figcaption>${item.title}</figcaption>
        </figure>
      </a>
    </li>
    `;
    insertLast(node, template);
  });
}
