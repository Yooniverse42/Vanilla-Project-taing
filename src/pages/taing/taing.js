import '@/layout/index';
import '@/components/loading.js';
import '@/pages/taing/taing.scss';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import { renderImgList, getNodes, getNode } from '@/library/index';
import { getRecords } from '@/api/getRecords';

const imageCollection = getRecords('image');
const loading = getNode('c-loading');

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

// 스와이퍼 랜더링 함수
async function loadingTaing() {
  // 메인 배너
  renderImgList(imageCollection, 'taing_banner', '.swiper1 > ul').then(() => {
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
      keyboard: true,
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
    .then(async () => {
      const list = getNodes('.swiper2 > ul > li');
      const records = await imageCollection;
      let record = records.filter((item) => item.category == 'main_poster');
      for (let i = 0; i < record.length; i++) {
        const template = `
        <h3>
          <span>${record[i].title}</span>
        </h3>
        `;
        list[i].insertAdjacentHTML('beforeend', template);
      }
    })
    .then(() => {
      new Swiper('.swiper2', {
        slidesPerView: 4,
        slidesPerGroup: 4,
        centeredSlides: false,
        grabCursor: true,
        keyboard: {
          enabled: true,
        },
        breakpoints: {
          768: {
            slidesPerView: 6,
            slidesPerGroup: 6,
          },
          1280: {
            slidesPerView: 8,
            slidesPerGroup: 8,
          },
        },
      });
    });

  // QUICK VOD
  renderImgList(imageCollection, 'quick_vod', '.swiper3 > ul')
    .then(async () => {
      const list = getNodes('.swiper3 > ul > li');
      const records = await imageCollection;
      let record = records.filter((item) => item.category == 'quick_vod');
      for (let i = 0; i < record.length; i++) {
        const template = `
        <h3>
          <span>${record[i].title}</span>
          <span>${record[i].episode}</span>
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
    .then(async () => {
      const list = getNodes('.swiper4 > ul > li');
      const records = await imageCollection;
      let record = records.filter((item) => item.category == 'main_poster');
      for (let i = 0; i < record.length; i++) {
        const template = `
        <h3>
          <span>${i + 1}</span>
          <span>${record[i].title}</span>
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
    .then(async () => {
      const list = getNodes('.swiper5 > ul > li');
      const records = await imageCollection;
      const record = records.filter((item) => item.category == 'live_channel');
      for (let i = 0; i < record.length; i++) {
        const template = `
        <h3>
          <span class="index">${i + 1}</span>
          <div class="text_wrapper">
            <span>${record[i].title}</span>
            <span>${record[i].episode}</span>
            <span>${record[i].viewer_rating}</span>
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

  // 공지사항
  new Swiper('.notice__swiper', {
    direction: 'vertical',
    slidesPerView: 1,
    spaceBetween: 10,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    loop: true,
  });
}

async function renderTaing() {
  loading.show();
  loadingTaing();
  await delay(2000);
  loading.hide();
}

renderTaing();
