import { insertLast } from '@/library/insert';
import getPbImageURL from '@/api/getPbImageURL';
import { getRecords } from '@/api/getRecords';

export async function renderImgList(
  collection,
  categoryName,
  node,
  sortField = null,
  needLink = true
) {
  const records = await collection;
  let record = records.filter((item) => item.category == categoryName);

  if (sortField) {
    record = record.sort((a, b) => a[sortField] - b[sortField]);
  }

  record.forEach((item) => {
    if (item.photo.length === 1) {
      const template = `
      <div class="swiper-slide">
        <img src="${getPbImageURL(item)}" alt="${item.title}" />
      </div>
      `;
      insertLast(node, template);
    } else {
      const pictureContent = `
        <picture>
          <source srcset="${getPbImageURL(item, 'tablet')}" media="(min-width: 768px) and (max-width: 1279px)" />
          <source srcset="${getPbImageURL(item, 'desktop')}" media="(min-width: 1280px)"/>
          <img src="${getPbImageURL(item)}" alt="${item.title}" />
        </picture>
      `;

      const template = needLink
        ? `
          <div class="swiper-slide">
            <a href="/src/pages/taing/index.html">
              ${pictureContent}
            </a>
          </div>
          `
        : `
          <div class="swiper-slide">
            ${pictureContent}
          </div>
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
    <div class="swiper-slide">
      <a href="/src/pages/taing/index.html">
        <figure>
          <picture>
            <source srcset="${getPbImageURL(item, 'tablet')}" media="(min-width: 768px) and (max-width: 1279px)" />
            <source srcset="${getPbImageURL(item, 'desktop')}" media="(min-width: 1280px)"/>
            <img src="${getPbImageURL(item)}" alt="${item.title}" />
          </picture>
          <figcaption>${item.title}</figcaption>
        </figure>
      </a>
    </div>
    `;
    insertLast(node, template);
  });
}
