import '@/layout/index';
import '@/components/loading.js';
import '@/pages/taing/taing.scss';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import { renderImgList, getNodes, getNode } from '@/library/index';
import { getRecords } from '@/api/getRecords';
import gsap from 'gsap';

function posterAnimation() {
  const posters = getNodes('.swiper-slide');

  posters.forEach((poster) => {
    const isExcludedBanner = poster.closest('.swiper1');
    const isExcludedNotice = poster.closest('.notice__swiper');
    if (isExcludedBanner || isExcludedNotice) return;

    poster.addEventListener('mouseenter', () => {
      gsap.to(poster, { y: -10 });
    });
    poster.addEventListener('mouseleave', () => {
      gsap.to(poster, { y: 0 });
    });
  });
}

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function checkPopupDate() {
  const popupDate = localStorage.getItem('popupDate');
  const today = new Date().toLocaleDateString();

  return popupDate === today;
}

function handlePopupButton() {
  const popUp = getNode('.popUp');
  const todayButton = getNode('.popUp__actions__today');
  const closeButton = getNode('.popUp__actions__close');

  return new Promise((resolve) => {
    const hidePopup = (isToday = false) => {
      popUp.classList.add('is--hidden');
      if (isToday) {
        localStorage.setItem('popupDate', new Date().toLocaleDateString());
      }
      resolve();
    };

    todayButton.addEventListener('click', () => hidePopup(true));
    closeButton.addEventListener('click', () => hidePopup(false));
  });
}

// 스와이퍼 랜더링 함수
async function loadingTaing() {
  const imageCollection = getRecords('image');
  // 메인 배너
  renderImgList(
    imageCollection,
    'taing_banner',
    '.swiper1 > .swiper-wrapper'
  ).then(() => {
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

  function createSwiper(
    className,
    mobileSlides,
    mobileLargeSlides,
    tabletSlides,
    desktopSlides
  ) {
    return new Swiper(className, {
      slidesPerView: mobileSlides,
      slidesPerGroup: mobileSlides,
      centeredSlides: false,
      grabCursor: true,
      keyboard: {
        enabled: true,
      },
      breakpoints: {
        430: {
          slidesPerView: mobileLargeSlides,
          slidesPerGroup: mobileLargeSlides,
        },
        768: {
          slidesPerView: tabletSlides,
          slidesPerGroup: tabletSlides,
        },
        1280: {
          slidesPerView: desktopSlides,
          slidesPerGroup: desktopSlides,
        },
      },
    });
  }

  // 메인 포스터
  renderImgList(imageCollection, 'main_poster', '.swiper2 > .swiper-wrapper')
    .then(async () => {
      const list = getNodes('.swiper2 .swiper-slide');
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
      createSwiper('.swiper2', 4.2, 5, 6.2, 7.8);
    });

  // QUICK VOD
  renderImgList(imageCollection, 'quick_vod', '.swiper3 > .swiper-wrapper')
    .then(async () => {
      const list = getNodes('.swiper3 .swiper-slide');
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
      createSwiper('.swiper3', 2.5, 3.5, 4.5, 5.5);
    });

  // 실시간 인기 프로그램
  renderImgList(
    imageCollection,
    'main_poster',
    '.swiper4 > .swiper-wrapper',
    'ranking'
  )
    .then(async () => {
      const list = getNodes('.swiper4 .swiper-slide');
      const records = await imageCollection;
      let record = records
        .filter((item) => item.category == 'main_poster')
        .sort((a, b) => a.ranking - b.ranking);
      for (let i = 0; i < record.length; i++) {
        const template = `
        <h3>
          <span>${record[i].ranking}</span>
          <span>${record[i].title}</span>
        </h3>
        `;
        list[i].insertAdjacentHTML('beforeend', template);
      }
    })
    .then(() => {
      createSwiper('.swiper4', 4.2, 5, 6.2, 7.8);
    });

  // 인기 LIVE 채널
  renderImgList(imageCollection, 'live_channel', '.swiper5 > .swiper-wrapper')
    .then(async () => {
      const list = getNodes('.swiper5 .swiper-slide');
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
      createSwiper('.swiper5', 2.5, 3.5, 4.5, 5.5);
    });

  // 오직 티빙에만 있어요
  renderImgList(imageCollection, 'original', '.swiper6 > .swiper-wrapper').then(
    () => {
      createSwiper('.swiper6', 2.3, 3.3, 4.3, 6.3);
    }
  );

  // SPOTV 이벤트
  renderImgList(imageCollection, 'sub_banner', '.sub_banner');

  // 이벤트
  renderImgList(imageCollection, 'event', '.swiper7 > .swiper-wrapper').then(
    () => {
      createSwiper('.swiper7', 2.1, 2.9, 3.5, 5.3);
    }
  );

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
  const loading = getNode('c-loading');
  const popUp = getNode('.popUp');
  const currentProfile = JSON.parse(localStorage.getItem('currentProfile'));
  if (currentProfile?.name === null || !currentProfile) {
    location.href = '/src/pages/profile/profile_select/';
    return;
  }

  if (checkPopupDate()) {
    popUp.classList.add('is--hidden');
  }

  let loadingPromise = loadingTaing();
  let isLoadingComplete = false;

  loadingPromise.then(() => {
    isLoadingComplete = true;
  });

  if (popUp.classList.contains('is--hidden')) {
    loading.show();
    await delay(1000);
    await loadingPromise;
    loading.hide();
  } else {
    await handlePopupButton();

    if (!isLoadingComplete) {
      loading.show();
      await delay(1000);
      await loadingPromise;
      loading.hide();
    }
  }
  posterAnimation();
}

renderTaing();
