// import pb from '@/api/pocketbase';
// import '/src/styles/pages/login_ID.scss';

// const records = await pb.collection('test').getFullList({
//   sort: '-created',
// });

// console.log(records);

import '/main.scss'
import '@/layout/header';
import '@/layout/footer';
import 'swiper/css/bundle';
import Swiper from 'swiper/bundle';

const swiper = new Swiper('.section1__swiper1', {
  autoplay: {
    delay: 2000,
  },
  slidesPerView: 2,
  spaceBetween: 12,
  centeredSlides: true,
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

createSwiper('.section2__swiper1', 3100);
createSwiper('.section2__swiper2', 3000);

