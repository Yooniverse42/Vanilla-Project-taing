import '@/layout/footer';
import '@/pages/taing/taing.scss';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import { renderImgList, getNodes, getNode } from '@/library/index';
import { getRecords } from '@/api/getRecords';

// 서버에서 image collection 가져오기
const imageCollection = await getRecords('image');

renderImgList(imageCollection, 'main_banner', '.swiper1 > ul').then(() => {
  const swiper1 = new Swiper('.swiper1', {
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },

    keyboard: {
      enabled: true,
    },
    loop: true,
    speed: 1000,
    parallax: true,
  });

  const autoPlayButton = getNode('#autoplaybutton');
  let isPaused = false;
  autoPlayButton.addEventListener('click', () => {
    if (!isPaused) {
      autoPlayButton.classList.add('paused');
      swiper1.autoplay.stop();
      isPaused = true;
    } else {
      autoPlayButton.classList.remove('paused');
      swiper1.autoplay.start();
      isPaused = false;
    }
  });
});

// 메인 포스터
renderImgList(imageCollection, 'main_poster', '.swiper2 > ul')
  .then(() => {
    const list = getNodes('.swiper2 > ul > li');
    const records = imageCollection.filter(
      (item) => item.category == 'main_poster'
    );
    for (let i = 0; i < records.length; i++) {
      const template = `
        <h3>
          <span>${records[i].title}</span>
        </h3>
        `;
      list[i].insertAdjacentHTML('beforeend', template);
    }
  })
  .then(() => {
    new Swiper('.swiper2', {
      parallax: true,
      freeMode: true,
      // slidesPerGroup: 2,
    });
  });

// QUICK VOD
renderImgList(imageCollection, 'quick_vod', '.swiper3 > ul')
  .then(() => {
    const list = getNodes('.swiper3 > ul > li');
    const records = imageCollection.filter(
      (item) => item.category == 'quick_vod'
    );
    for (let i = 0; i < records.length; i++) {
      const template = `
        <h3>
          <span>${records[i].title}</span>
          <span>${records[i].episode}</span>
        </h3>
        `;
      list[i].insertAdjacentHTML('beforeend', template);
    }
  })
  .then(() => {
    new Swiper('.swiper3', {
      parallax: true,
      freeMode: true,
      slidesPerGroup: 2,
    });
  });

// 실시간 인기 프로그램
renderImgList(imageCollection, 'main_poster', '.swiper4 > ul')
  .then(() => {
    const list = getNodes('.swiper4 > ul > li');
    const records = imageCollection.filter(
      (item) => item.category == 'main_poster'
    );
    for (let i = 0; i < records.length; i++) {
      const template = `
        <h3>
          <span>${i + 1}</span>
          <span>${records[i].title}</span>
        </h3>
        `;
      list[i].insertAdjacentHTML('beforeend', template);
    }
  })
  .then(() => {
    new Swiper('.swiper4', {
      parallax: true,
      freeMode: true,
      slidesPerGroup: 3,
    });
  });

// 인기 LIVE 채널
renderImgList(imageCollection, 'live_channel', '.swiper5 > ul')
  .then(() => {
    const list = getNodes('.swiper5 > ul > li');
    const records = imageCollection.filter(
      (item) => item.category == 'live_channel'
    );
    for (let i = 0; i < records.length; i++) {
      const template = `
        <h3>
          <span class="index">${i + 1}</span>
          <div class="text_wrapper">
            <span>${records[i].title}</span>
            <span>${records[i].episode}</span>
            <span>${records[i].viewer_rating}</span>
          </div>
        </h3>
        `;
      list[i].insertAdjacentHTML('beforeend', template);
    }
  })
  .then(() => {
    new Swiper('.swiper5', {
      parallax: true,
      freeMode: true,
      slidesPerGroup: 2,
    });
  });

// 오직 티빙에만 있어요
renderImgList(imageCollection, 'original', '.swiper6 > ul').then(() => {
  new Swiper('.swiper6', {
    parallax: true,
    freeMode: true,
  });
});

// SPOTV 이벤트
renderImgList(imageCollection, 'sub_banner', '.sub_banner');

// 이벤트
renderImgList(imageCollection, 'event', '.swiper7 > ul').then(() => {
  new Swiper('.swiper7', {
    parallax: true,
    freeMode: true,
    slidesPerGroup: 2,
  });
});
