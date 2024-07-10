import '@/layout/footer';
import '@/styles/pages/taing.scss';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import { renderImgList, renderImgTitleList } from '@/library/index';
import { getRecords } from '@/api/getRecords';

const banner = getRecords('banner_test');
renderImgList(banner, '.swiper1 > ul').then(() => {
  new Swiper('.swiper1', {
    // autoplay: {
    //   delay: 1000,
    //   disableOnInteraction: false,
    // },
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

  // const autoplayButton = document.querySelector('.swiper-autoplayButton');
  // autoplayButton.addEventListener('click', swiper1.autoplay.start());
});

const poster = getRecords('taing_main_poster');
renderImgList(poster, '.swiper2 > ul').then(() => {
  new Swiper('.swiper2', {
    parallax: true,
    freeMode: true,
    // slidesPerGroup:
  });
});

const quickVod = getRecords('quick_vod');
renderImgTitleList(quickVod, '.swiper3 > ul').then(() => {
  new Swiper('.swiper3', {
    parallax: true,
    freeMode: true,
    slidesPerGroup: 2,
  });
});

renderImgTitleList(poster, '.swiper4 > ul').then(() => {
  new Swiper('.swiper4', {
    parallax: true,
    freeMode: true,
    slidesPerGroup: 3,
  });
});

const liveChannel = getRecords('live_channel');
renderImgTitleList(liveChannel, '.swiper5 > ul').then(() => {
  new Swiper('.swiper5', {
    parallax: true,
    freeMode: true,
    slidesPerGroup: 2,
  });
});

const original = getRecords('original');
renderImgList(original, '.swiper6 > ul').then(() => {
  new Swiper('.swiper6', {
    parallax: true,
    freeMode: true,
  });
});

const subBanner = getRecords('sub_banner');
renderImgList(subBanner, '.sub_banner');

const event = getRecords('event');
renderImgList(event, '.swiper7 > ul').then(() => {
  new Swiper('.swiper7', {
    parallax: true,
    freeMode: true,
    slidesPerGroup: 2,
  });
});
