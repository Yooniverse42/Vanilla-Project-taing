import '@/styles/pages/scroll_section_2.scss';

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

createSwiper('.swiper-1', 3100);
createSwiper('.swiper-2', 3000);
