import '@/styles/pages/onboarding/onboarding_section1.scss';
import 'swiper/css/bundle';
import Swiper from 'swiper/bundle';
import { Pagination } from 'swiper/modules';

const swiper = new Swiper('.swiper', {
  autoplay: {
    delay: 1000,
  },
  // lopp: true,
  speed: 2000,
  // parallx: true,
  // // slidesPerView: 1,
  // // slidesPerGroup: 1,
  // spaceBetween: 20,
  // // freeMode: true,
  // breakpoints: {
  //   1920: {
  //     slidesPerView: 1,
  //     slidesPerGroup: 1,
  //   },
  //   768: {
  //     slidesPerView: 1,
  //     slidesPerGroup: 1,
  //   },
  // },
});

// const swiper2 = new Swiper('.pc-swiper', {
//   autoplay: {
//     delay: 3000,
//   },
//   lopp: true,
//   seepd: 2000,
//   parallx: true,
// });
/*
css 로 만들면 안된다 


*/
