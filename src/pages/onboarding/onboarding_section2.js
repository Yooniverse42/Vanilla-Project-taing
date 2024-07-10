import '@/styles/pages/onboarding/onboarding_section2.scss';

// import Swiper bundle with all modules installed
import Swiper from 'swiper/bundle';

// import styles bundle
import 'swiper/css/bundle';

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
