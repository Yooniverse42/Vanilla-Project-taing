import { insertLast } from '@/library/insert';
import getPbImageURL from '@/api/getPbImageURL';

export async function renderImgList(storage, node) {
  const records = await storage;

  records.forEach((item) => {
    const template = `
      <div class="swiper-slide">
        <picture>
          <source srcset="${getPbImageURL(item)}" media="(max-width: 768px)" />
          <source srcset="${getPbImageURL(item, 'tablet')}" media="(max-width: 1919px)" />
          <source srcset="${getPbImageURL(item, 'desktop')}" media="(min-width: 1920)"/>
          <img src="/src/img.jpg" alt="러브캐처 포스터" />
        </picture>
      </div>
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
        <picture class="swiper-slide">
          <source srcset="${getPbImageURL(item)}" media="(max-width: 768px)" />
          <source srcset="${getPbImageURL(item, 'tablet')}" media="(max-width: 1919px)" />
          <source srcset="${getPbImageURL(item, 'desktop')}" media="(min-width: 1920)"/>
          <img src="/src/img.jpg" alt="러브캐처 포스터" />
        </picture>
        <h3>
          <span>${item.title}</span>
          <span>${item.episode}</span>
        </h3>
      </li>
      
    `;
      insertLast(node, template);
    } else {
      const template = `
      <li class="swiper-slide">
        <picture class="swiper-slide">
          <source srcset="${getPbImageURL(item)}" media="(max-width: 768px)" />
          <source srcset="${getPbImageURL(item, 'tablet')}" media="(max-width: 1919px)" />
          <source srcset="${getPbImageURL(item, 'desktop')}" media="(min-width: 1920)"/>
          <img src="/src/img.jpg" alt="러브캐처 포스터" />
        </picture>
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
