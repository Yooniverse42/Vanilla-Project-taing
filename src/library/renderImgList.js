import { insertLast } from '@/library/insert';
import getPbImageURL from '@/api/getPbImageURL';
import pb from '@/api/pocketbase';

export async function renderImgList(storage, node) {
  const records = await pb.collection(storage).getFullList();

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
