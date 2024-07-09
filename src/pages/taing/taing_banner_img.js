import '@/layout/footer';
import '@/styles/pages/taing.scss';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import { renderImgList } from '@/library/index';

// const autoplayButton = document.querySelector('.swiper-autoplayButton');
// autoplayButton.addEventListener('click', swiper1.autoplay.stop());

renderImgList('banner_test', '.swiper1 > ul').then(() => {
  new Swiper('.swiper1', {
    autoplay: {
      delay: 1000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    keyboard: {
      enabled: true,
    },
    loop: true,
    speed: 1000,
    parallax: true,
  });
});

renderImgList('poster_test', '.swiper2 > ul').then(() => {
  new Swiper('.swiper2', {
    parallax: true,
    freeMode: true,
  });
});

renderImgList('quick_vod', '.swiper3 > ul').then(() => {
  new Swiper('.swiper3', {
    parallax: true,
    freeMode: true,
  });
});

renderImgList('poster_test', '.swiper4 > ul').then(() => {
  new Swiper('.swiper4', {
    parallax: true,
    freeMode: true,
  });
});

renderImgList('live_channel', '.swiper5 > ul').then(() => {
  new Swiper('.swiper5', {
    parallax: true,
    freeMode: true,
  });
});
