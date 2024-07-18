import '/main.scss';
// import '@/layout/index';
import 'swiper/css/bundle';
import Swiper from 'swiper/bundle';
import { renderImgList } from '@/library/index';
import { getRecords } from '@/api/getRecords';

// 서버에서 image collection 가져오기
const imageCollection = getRecords('image');
renderImgList(imageCollection, 'onboarding0', '.section0__background');

new Swiper('.section1__swiper1', {
  autoplay: {
    delay: 1500,
  },

  slidesPerView: 1.5,
  spaceBetween: 12,
  centeredSlides: true,
  breakepoint: {
    768: {
      spaceBetween: 20,
    },
  },
});

function createSwiper(className, speed) {
  return new Swiper(className, {
    autoplay: {
      delay: 0,
      reverseDirection: true,
    },
    speed: speed,
    loop: true,
    spaceBetween: 12,
    slidesPerView: 1.7,
    breakpoints: {
      768: {
        slidesPerView: 4,
      },
    },
  });
}

createSwiper('.section2__swiper1', 5000);
createSwiper('.section2__swiper2', 5030);
