import { insertLast } from '@/library/insert';
import getPbImageURL from '@/api/getPbImageURL';

export async function renderImgList(storage, node) {
  const records = await storage;
  records.forEach((item) => {
    const template = `
      <li class="swiper-slide">
        <img
          src="${getPbImageURL(item)}"
          alt="${item.title}"
        />
      </li>
    `;
    insertLast(node, template);
  });
}

export async function renderImgTitleList(storage, node) {
  const records = await storage;
  records.forEach((item) => {
    if (Object.prototype.hasOwnProperty.call(item, 'episode')) {
      const template = `
      <li class="swiper-slide">
        <img
          src="${getPbImageURL(item)}"
          alt="${item.title}"
        />
        <h3>${item.title}</h3>
        <span>${item.episode}</span>
      </li>
      
    `;
      insertLast(node, template);
    } else {
      const template = `
      <li class="swiper-slide">
        <img
          src="${getPbImageURL(item)}"
          alt="${item.title}"
        />
        <h3>
          <span>${records.indexOf(item) + 1}</span>
          <span>${item.title}</span>
        </h3>
      </li>
    `;
      insertLast(node, template);
    }
  });
}
